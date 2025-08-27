# 🏗️ 构建环境配置指南

## 📋 **构建环境概览**

本项目支持5种不同的构建环境，每个环境都有独立的配置文件和构建参数：

| 环境              | 配置文件          | 构建命令                | 目标环境     | 用途           |
| ----------------- | ----------------- | ----------------------- | ------------ | -------------- |
| 🔧 **开发构建**   | `env.development` | `npm run build:dev`     | 开发服务器   | 开发环境打包   |
| 🧪 **测试构建**   | `env.test`        | `npm run build:test`    | 测试服务器   | 测试环境打包   |
| 🚀 **预发布构建** | `env.staging`     | `npm run build:staging` | 预发布服务器 | 预发布环境打包 |
| 🎯 **生产构建**   | `env.production`  | `npm run build:prod`    | 生产服务器   | 生产环境打包   |
| 📦 **默认构建**   | `env.production`  | `npm run build`         | 生产服务器   | 默认生产构建   |

## 🔧 **开发环境构建**

### 配置文件: `env.development`

```bash
NODE_ENV=production
NUXT_PUBLIC_API_BASE=http://192.168.232.180:51000
NUXT_PUBLIC_OBS_BASE=http://192.168.232.180:51000
NUXT_PUBLIC_MD_BASE=http://192.168.232.180:51000
NITRO_MINIFY=false
```

### 构建命令

```bash
npm run build:dev
```

### 特点

- 连接开发API服务器
- 保留调试信息
- 未压缩代码便于调试

## 🧪 **测试环境构建**

### 配置文件: `env.test`

```bash
NODE_ENV=production
NUXT_PUBLIC_API_BASE=https://m.hismk.club
NUXT_PUBLIC_OBS_BASE=https://m.hismk.club
NUXT_PUBLIC_MD_BASE=https://m.hismk.club
NITRO_MINIFY=true
```

### 构建命令

```bash
npm run build:test
```

### 特点

- 连接测试API服务器
- 代码压缩优化
- 接近生产环境配置

## 🚀 **预发布环境构建**

### 配置文件: `env.staging`

```bash
NODE_ENV=production
NUXT_PUBLIC_API_BASE=https://staging.hismk.club
NUXT_PUBLIC_OBS_BASE=https://staging.hismk.club
NUXT_PUBLIC_MD_BASE=https://staging.hismk.club
NUXT_PUBLIC_CDN_HOST=https://staging-cdn.yourdomain.com
NITRO_MINIFY=true
```

### 构建命令

```bash
npm run build:staging
```

### 特点

- 连接预发布API服务器
- 使用CDN配置
- 完整生产优化

## 🎯 **生产环境构建**

### 配置文件: `env.production`

```bash
NODE_ENV=production
NUXT_PUBLIC_API_BASE=https://192.168.232.182
NUXT_PUBLIC_OBS_BASE=https://192.168.232.182
NUXT_PUBLIC_MD_BASE=https://192.168.232.182
NUXT_PUBLIC_CDN_HOST=https://cdn.yourdomain.com
NITRO_MINIFY=true
```

### 构建命令

```bash
npm run build:prod
# 或者
npm run build
```

### 特点

- 连接生产API服务器
- 使用生产CDN
- 最大化优化和压缩

## 📦 **静态生成 (Generate)**

支持所有环境的静态生成：

```bash
# 开发环境静态生成
npm run generate:dev

# 测试环境静态生成
npm run generate:test

# 预发布环境静态生成
npm run generate:staging

# 生产环境静态生成
npm run generate:prod
```

## 🎯 **构建优化配置**

### Vite构建优化

```typescript
vite: {
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'vant-vendor': ['vant'],
          'pinia-vendor': ['pinia'],
        },
      },
    },
  },
}
```

### Nitro构建优化

```typescript
nitro: {
  minify: process.env.NITRO_MINIFY === 'true',
  prerender: {
    crawlLinks: false,
    routes: ['/'],
  },
}
```

## 🌍 **环境变量详解**

### 核心环境变量

| 变量名                 | 说明            | 示例值                       |
| ---------------------- | --------------- | ---------------------------- |
| `NODE_ENV`             | Node.js环境模式 | `production`                 |
| `NUXT_MOCK_ENABLED`    | 是否启用Mock    | `false`                      |
| `NUXT_PUBLIC_API_BASE` | API基础地址     | `https://192.168.232.182`    |
| `NUXT_PUBLIC_OBS_BASE` | 静态资源地址    | `https://192.168.232.182`    |
| `NUXT_PUBLIC_CDN_HOST` | CDN域名         | `https://cdn.yourdomain.com` |
| `NITRO_MINIFY`         | 是否压缩代码    | `true`                       |

### 构建特定变量

```bash
# 应用信息
NUXT_PUBLIC_APP_NAME=nuxt-vant-mobile
NUXT_PUBLIC_APP_VERSION=0.6.0

# 构建优化
NITRO_MINIFY=true
```

## 🚀 **部署指南**

### 1. 开发环境部署

```bash
# 构建
npm run build:dev

# 预览
npm run preview
```

### 2. 测试环境部署

```bash
# 构建
npm run build:test

# 部署到测试服务器
# 将 .output 目录上传到服务器
```

### 3. 生产环境部署

```bash
# 构建
npm run build:prod

# 部署到生产服务器
# 将 .output 目录上传到生产服务器
```

### 4. 静态部署

```bash
# 生成静态文件
npm run generate:prod

# 部署静态文件
# 将 .output/public 目录上传到CDN或静态服务器
```

## 🔍 **构建验证**

### 本地验证

```bash
# 构建后预览
npm run build:prod
npm run preview

# 检查构建产物
ls -la .output/
```

### 环境验证清单

- [ ] API请求指向正确的服务器
- [ ] 静态资源加载正常
- [ ] CDN配置生效
- [ ] 代码压缩正常
- [ ] 路由跳转正常
- [ ] 功能完整性测试

## 📊 **构建分析**

### 查看构建大小

```bash
# 构建并分析
npm run build:prod
npx nuxi analyze
```

### Bundle分析

构建后会自动进行代码分包：

- `vue-vendor`: Vue核心库
- `vant-vendor`: Vant UI组件
- `pinia-vendor`: Pinia状态管理

## 🛠️ **CI/CD 集成**

### GitHub Actions 示例

```yaml
name: Build and Deploy

on:
  push:
    branches: [main, develop]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: pnpm

      - run: pnpm install

      # 根据分支选择构建环境
      - name: Build for production
        if: github.ref == 'refs/heads/main'
        run: npm run build:prod

      - name: Build for staging
        if: github.ref == 'refs/heads/develop'
        run: npm run build:staging
```

## 🎉 **最佳实践**

1. **🎯 环境隔离**: 不同环境使用不同的API地址和CDN
2. **🔒 安全配置**: 生产环境启用所有优化和压缩
3. **📊 监控**: 监控构建时间和包大小
4. **🚀 自动化**: 使用CI/CD自动化构建和部署
5. **🧪 测试**: 每个环境构建后进行功能测试
6. **📦 缓存**: 合理配置浏览器缓存策略

---

**总结**: 构建环境配置系统已完全配置完成，支持开发、测试、预发布、生产4种构建环境，每个环境都有独立的配置文件和优化策略！
