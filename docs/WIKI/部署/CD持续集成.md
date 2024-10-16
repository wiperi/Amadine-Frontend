为了在CI/CD（持续集成/持续部署）中配置自动部署（CD环节），你可以采用以下步骤来设置自动化的部署流程。

### 1. **准备工作**
确保你的个人服务器上已经有以下环境：
- **Node.js**（用于运行Express和React应用）
- **Git**（用于代码版本控制）
- **SSH 访问**（用于安全登录和自动化部署）
- **CI/CD平台**（例如GitHub Actions、GitLab CI、Jenkins等）

### 2. **CD流程概述**
CI/CD工具将自动检测代码库中的变更（通常是代码推送到指定分支，例如`main`或`master`），并执行自动部署过程。一般步骤如下：
1. **检测到变更**：当你推送到代码库时，CI/CD工具触发流程。
2. **构建和测试**：CI工具会先执行项目的构建与测试（此步可能在CI流程中完成）。
3. **部署到服务器**：通过SSH或FTP将构建好的应用部署到服务器，重启服务以应用新版本。

### 3. **配置GitHub Actions（举例）**
假设你使用的是GitHub Actions，这里是一个配置示例：

#### a) **配置SSH密钥**（确保服务器与GitHub之间能安全通信）
1. 在服务器上生成SSH密钥对（如果尚未生成）：
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```
2. 将公钥 (`~/.ssh/id_rsa.pub`) 添加到服务器的 `~/.ssh/authorized_keys` 文件中。
3. 将私钥作为GitHub仓库中的Secret，步骤：
   - 转到GitHub项目 > Settings > Secrets and Variables > Actions > New repository secret
   - 添加变量名为 `SSH_PRIVATE_KEY`，内容是生成的私钥。

#### b) **创建GitHub Actions工作流**
在你的项目根目录下创建 `.github/workflows/deploy.yml` 文件，内容如下：

```yaml
name: Deploy to Server

on:
  push:
    branches:
      - main  # 当推送到main分支时触发

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Install Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'  # 选择你用的Node.js版本

    - name: Install dependencies
      run: |
        npm install
        npm run build  # 构建React前端应用

    - name: Deploy to Server
      uses: appleboy/ssh-action@v0.1.7
      with:
        host: ${{ secrets.SERVER_IP }}  # 你的服务器IP
        username: ${{ secrets.SERVER_USER }}  # SSH用户名
        key: ${{ secrets.SSH_PRIVATE_KEY }}  # 使用私钥
        script: |
          cd /path/to/your/app
          git pull origin main  # 拉取最新代码
          npm install  # 安装依赖
          npm run build  # 构建
          pm2 restart all  # 重新启动服务
```

#### c) **GitHub Secrets配置**
确保以下Secrets已经在GitHub项目中设置：
- `SERVER_IP`：你的服务器IP地址。
- `SERVER_USER`：服务器的SSH用户名。
- `SSH_PRIVATE_KEY`：你生成的SSH私钥。

### 4. **自动重启和日志管理**
使用 `PM2` 或 `Forever` 这样的工具来管理你的Node.js服务。你可以通过它们方便地重启服务和监控日志：
```bash
# 安装PM2
npm install pm2 -g

# 启动服务
pm2 start app.js --name "my-app"

# 查看服务状态
pm2 status

# 重启服务
pm2 restart all
```

### 5. **调试与优化**
部署后可以检查：
- **GitHub Actions logs** 以查看部署是否顺利完成。
- **PM2 logs** 以查看应用运行日志。

这种方式可以帮助你在代码推送时实现Express后端和React前端的自动化部署。如果你有更复杂的需求，比如数据库迁移或更复杂的部署流程，可以在部署脚本中增加额外的步骤。