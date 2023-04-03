import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { FitAddon } from 'xterm-addon-fit';

import 'xterm/css/xterm.css';

const FontSize = 14;
const Col = 80;

const WebTerminal = () => {
  const webTerminal = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    // 初始化终端
    const ele = document.getElementById('terminal');
    if (ele && !webTerminal.current) {
      const height = ele.clientHeight;
      // 初始化
      const terminal = new Terminal({
        cursorBlink: true,
        cols: Col,
        rows: Math.ceil(height / FontSize),
      });

      // 辅助
      const fitAddon = new FitAddon();
      terminal.loadAddon(new WebLinksAddon());
      terminal.loadAddon(fitAddon);

      terminal.open(ele);
      terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
      fitAddon.fit();
      webTerminal.current = terminal;
    }

    // 初始化ws连接
    if (ws.current) ws.current.close();

    const socket = new WebSocket('ws://localhost:3001');
    socket.onopen = () => {
      socket.send('connect success');
    };

    ws.current = socket;
  }, []);

  useEffect(() => {
    // 新增监听事件
    const terminal = webTerminal.current;
    const socket = ws.current;

    if (terminal && socket) {
      // 监听
      terminal.onKey(e => {
        const { key } = e;
        socket.send(key);
      });

      // ws监听
      socket.onmessage = e => {
        console.log(e);

        if (typeof e.data === 'string') {
          terminal.write(e.data);
        } else {
          console.error('格式错误');
        }
      };
    }
  }, []);

  return <div id="terminal"  style={{ backgroundColor: '#000', width: '100vw', height: '100vh' }}/>;
};

export default WebTerminal;
