标题：使用 rrweb 录制和回放 WebSSH 会话

引言：
WebSSH 是一个基于 Web 的 SSH 客户端工具，而 rrweb 是一个用于记录和重放 Web 应用程序的 JavaScript 库。本文将介绍如何使用 rrweb 来录制和回放 WebSSH 会话，以及提供相关录制和回放代码示例。

先放效果示例：[rrweb回放webssh录制示例](https://html-css-js-huangjuan0229.inscode.cc/)。这是一个我已经提前录制好的webssh操作的回放效果。

## 1. 安装和配置 WebSSH

确保你已成功搭建起 WebSSH。具体参考：[react express实现 webssh demo](https://juejin.cn/post/7217657943607574565?searchId=2023072713352742C295E3FD2D64A708B2)

## 2. 引入 rrweb

在index.html文件中因为rrweb.min.js和rrweb.min.css，当然你也可以使用 npm 或 yarn 进行 rrweb 的安装，并在项目中引入 rrweb 库。

```shell
# 在<head>中引入rrweb
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css" />
<script src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js"></script>
```

## 3. 录制 WebSSH 会话

在<body>中引入下面这段js

```html
<script>
  let events = [];
  rrweb.record({
    emit(event) {
      if (events.length > 200) {
        // 当 events 数组长度超过 200 时，直接在控制台打印 events
        // 实际开发中，可以将 events 数组发送给后端进行存储
        console.log('xxxxxx', JSON.stringify(events));
      } else {
        // 将 event 存入 events 数组中
        events.push(event);
      }
    },
    // 设置以下选项，以支持 Canvas 元素的录制
    recordCanvas: true,
    // 设置以下选项，以支持跨域 iframe 的录制
    recordCrossOriginIframes: true,
  });
</script>
```

以上代码演示了如何使用 rrweb 的 `record` 方法来录制 WebSSH 会话。在 `emit` 回调函数中，我们判断了 events 数组长度是否超过 200，如果超过了，则直接打印 events 数组的内容，实际开发中可以根据需要将其发送给后端进行存储。

## 4. 回放录制的会话

```html
<!DOCTYPE html>
<html>
<head>
  <title>回放录制</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js"></script>
  <script src="./rrweb_replayer_demo.js"></script>
</head>
<body>
  <script>
    // 这里的events时上面录制的events，步骤3在控制台打印的events，复制出来粘贴在这里即可
    const events = [];
    const replayer = new rrweb.Replayer(events, {
      UNSAFE_replayCanvas: true,
    });
    replayer.play();
  </script>
</body>
</html>
```

以上代码演示了如何使用 rrweb 的 `Replayer` 类来回放录制的 WebSSH 会话。在创建 `Replayer` 实例时，我们传入了之前录制的 events 数组，并设置了 `UNSAFE_replayCanvas` 选项来支持 Canvas 元素的回放。

## 5. 总结

在本节中，我们回顾了使用 rrweb 录制和回放 WebSSH 会话的步骤。通过引入 rrweb 库，并结合录制和回放代码示例，我们可以轻松实现会话的录制和回放功能。

## 结语

使用 rrweb 来录制和回放 WebSSH 会话可以方便地记录用户操作并进行回放，为用户提供更好的体验。希望本文对你有所帮助，如果有任何问题，请随时联系我。祝你在使用 rrweb 进行会话录制和回放时取得成功！

# Refer

[rrweb录制webssh功能源码](https://github.com/OpalWrightsel/webssh-demo/tree/rrweb-ssh)
[rrweb doc](https://github.com/rrweb-io/rrweb)
