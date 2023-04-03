# 基础镜像
FROM node

# 设置工作目录
WORKDIR /usr/src/app

# 添加项目文件
COPY . .

# 安装npm依赖
RUN npm install

# 暴露端口
EXPOSE 3000

# 运行应用
CMD [ "npm", "start" ]
