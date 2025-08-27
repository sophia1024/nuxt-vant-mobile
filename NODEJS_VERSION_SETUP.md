# Node.js 版本自动切换配置

本项目已配置为使用 Node.js 22.12.0 版本，并支持自动版本切换。

## 配置文件

- `.nvmrc` - 指定项目使用的 Node.js 版本 (22.12.0)
- `package.json` - engines 字段要求 Node.js >=22.12.0
- `.zshrc_nvm_config` - 自动切换 Node.js 版本的 zsh 配置

## 自动配置步骤

### 1. 确保已安装 NVM

```bash
# 如果未安装 NVM，请先安装
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### 2. 应用自动切换配置

将以下内容添加到你的 `~/.zshrc` 文件中：

```bash
# 添加 NVM 自动切换配置
source "$(pwd)/.zshrc_nvm_config"
```

或者直接执行：

```bash
echo 'source "$(pwd)/.zshrc_nvm_config"' >> ~/.zshrc
source ~/.zshrc
```

### 3. 安装并使用指定的 Node.js 版本

```bash
# 安装 Node.js 22.12.0
nvm install 22.12.0

# 使用 Node.js 22.12.0
nvm use 22.12.0

# 设置为默认版本（可选）
nvm alias default 22.12.0
```

## 工作原理

配置完成后，当你：

1. **进入项目目录** - 自动切换到 `.nvmrc` 指定的版本 (22.12.0)
2. **离开项目目录** - 自动恢复到默认版本
3. **在项目目录中打开新终端** - 自动使用正确版本

## 验证配置

```bash
# 检查当前 Node.js 版本
node --version
# 应该输出: v22.12.0

# 检查 npm 版本
npm --version

# 测试自动切换
cd .. && cd nuxt-vant-mobile
# 应该看到版本切换的提示信息
```

## VS Code 配置

如果使用 VS Code，建议在 `.vscode/settings.json` 中添加：

```json
{
  "typescript.preferences.includePackageJsonAutoImports": "off",
  "typescript.nodejs.path": "~/.nvm/versions/node/v22.12.0/bin/node"
}
```

## 注意事项

- 确保你的 Shell 是 zsh（macOS 默认）
- 如果使用其他 Shell（如 bash），需要相应调整配置文件
- 团队成员都需要安装相同的 Node.js 版本以确保一致性
