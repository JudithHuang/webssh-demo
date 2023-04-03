# 本地起Server服务

## install deps

```shell
npm install
```

## start server

```shell
npm run start
```

# Docker部署

## 打镜像

```shell
DOCKER_BUILDKIT=0 docker build -t mec-webssh -f "Dockerfile" ./
```

## 起容器

```shell
docker run --name mec-webssh -p 3000:3000 mec-webssh:latest
```
