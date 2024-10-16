# 部署到服务器

服务器配置
ubuntu 22.04


后端


1. 安装 NVM 和 Node.js 20.17.0

```bash
# 安装 NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# 重新加载 shell 配置以使 NVM 可用
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# 安装 Node.js 20.17.0
nvm install 20.17.0

# 设置 20.17.0 为默认版本
nvm use 20.17.0

# 验证安装
node --version
npm --version
```

2. 克隆项目代码

```bash
git clone GITHUB_URL
```

3. 安装依赖

```bash
npm i

# 测试运行状态
npm run start
```

4. 设置服务器监听IP地址和端口号

将监听IP地址和端口号设置为0.0.0.0和3200，这样配置表示监听3200端口上来自所有IP地址的请求。0.0.0.0表示所有IP地址。

```bash
# 编辑 server.js 文件
nano server.js

# 找到并修改以下内容
const PORT: number = parseInt(process.env.PORT || 3200);
const HOST: string = process.env.IP || '0.0.0.0';
```

4. 设置防火墙规则

```bash
# 允许 3200 端口
sudo ufw allow 3200

# 重新加载防火墙
sudo ufw reload

# 允许 Nginx 全端口
sudo ufw allow 'Nginx Full'

# 列出所有规则
sudo ufw status
```

5. 使用PM2管理应用

为了确保你的应用能够在服务器上持久运行并自动重启，可以使用PM2来管理你的应用：

```bash
# 安装 PM2
sudo npm install -g pm2

# 启动应用
pm2 start npm --name 'Amadine Backend' -- run start

# 开机自启动
pm2 startup
pm2 save

# 查看 PM2 状态
pm2 list

# 停止应用
pm2 stop 'Amadine Backend'
pm2 stop 0

# 重启应用
pm2 restart 'Amadine Backend'
pm2 restart 0

# 删除应用
pm2 delete 'Amadine Backend'
pm2 delete 0
pm2 delete all

# 查看 PM2 日志
pm2 logs 'Amadine Backend'
pm2 logs 0
```

浏览器中通过IP地址+端口号测试后端服务

```http
http://SERVER_IP:3200/
```

4. 配置 Nginx

```bash
# 更新软件包列表
sudo apt-get update

# 安装 Nginx
sudo apt-get install nginx

# 启动 Nginx
sudo systemctl start nginx

# 设置 Nginx 开机自启动
sudo systemctl enable nginx

# 配置 Nginx 以反向代理到你的 Node.js 应用
sudo nano /etc/nginx/sites-available/default

# /etc/nginx/sites-available/default文件应该包含以下内容
server {
  # 监听所有IP地址的80端口
	listen 80 default_server;
	listen [::]:80 default_server;

  # Nginx 将响应的域名
	server_name amadine.tian77.me;

  # 前端应用配置
  # 适用于单页应用SPA的配置
  location / {
    # root指定，当匹配到相应的 location 块时，从哪个目录开始查找请求的文件。
    # 路径中，/var/www/Amadine 是前端 build 文件夹的路径
    # 路径不能是 /root/ 开头，由于Nginx以用户身份www-data运行，没有权限访问/root/目录
    root /var/www/Amadine;

    # try_files 指令告诉 Nginx 按照指定的顺序尝试查找文件
    # Nginx 首先尝试找到与请求 URI 完全匹配的文件。
    # 如果找不到，它会提供 /index.html 文件。
    try_files $uri /index.html;
  }

  # 后端 API 配置
  location /api/ {
    # 由于前端在访问api时，会在url前添加/api以区分api和静态资源
    # 所以这里需要将 /api/* 重写为 /*
    rewrite ^/api/(.*)$ /$1 break;

    # 将请求代理到后端 Node.js 应用
    proxy_pass http://localhost:3200;

    # 设置请求头
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}

# 测试 Nginx 配置
sudo nginx -t

# 重新加载 Nginx 配置
sudo systemctl reload nginx

# 检查 Nginx 状态
sudo systemctl status nginx

# 检查80端口是否被占用
sudo lsof -i:80

# 检查 Nginx 日志
sudo journalctl -u nginx
sudo tail -f /var/log/nginx/error.log
```

通过浏览器，访问域名，测试是否成功

```http
http://amadine.tian77.me/api/echo
```


## 前端

1. 克隆项目代码

```bash
git clone GITHUB_URL
```

2. 复制build文件夹

如果项目代码存放在 /root/ 目录下，则需要将 build 文件夹复制到 /var/www/ 目录下,
因为 Nginx 以用户身份www-data运行，没有权限访问/root/目录

```bash
cp -r build /var/www/Amadine
```

3. 配置 Nginx

如上，配置 Nginx 以反向代理到前端应用

4. 测试

通过浏览器，访问域名，测试是否成功

```http
http://amadine.tian77.me/
```






