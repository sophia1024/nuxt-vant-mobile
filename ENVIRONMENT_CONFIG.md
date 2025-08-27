# 🌍 多环境配置系统

## 📋 **环境概览**

本项目支持完整的开发、测试、构建环境配置，每个环境都有独立的配置文件和代理设置：

### 🔧 **开发环境 (Development Servers)**

| 环境            | 配置文件          | 启动命令           | 代理目标                       | 用途     |
| --------------- | ----------------- | ------------------ | ------------------------------ | -------- |
| 🔧 **开发环境** | `env.development` | `npm run dev`      | `http://192.168.232.180:51000` | 本地开发 |
| 🧪 **测试环境** | `env.test`        | `npm run dev:test` | `https://m.hismk.club`         | 测试验证 |
| 🎭 **Mock环境** | `env.mock`        | `npm run dev:mock` | 本地Mock API                   | 离线开发 |

### 🏗️ **构建环境 (Build Environments)**

| 环境              | 配置文件          | 构建命令                | 目标服务器   | 用途           |
| ----------------- | ----------------- | ----------------------- | ------------ | -------------- |
| 🔧 **开发构建**   | `env.development` | `npm run build:dev`     | 开发服务器   | 开发环境打包   |
| 🧪 **测试构建**   | `env.test`        | `npm run build:test`    | 测试服务器   | 测试环境打包   |
| 🚀 **预发布构建** | `env.staging`     | `npm run build:staging` | 预发布服务器 | 预发布环境打包 |
| 🎯 **生产构建**   | `env.production`  | `npm run build:prod`    | 生产服务器   | 生产环境打包   |

## 🚀 **快速开始**

### 开发模式

```bash
# 开发环境
npm run dev

# 测试环境
npm run dev:test

# Mock环境
npm run dev:mock
```

### 构建模式

```bash
# 生产构建
npm run build:prod

# 测试构建
npm run build:test

# 预发布构建
npm run build:staging

# 使用构建脚本 (推荐)
./scripts/build.sh prod build
./scripts/build.sh staging generate
```

## 🔧 **开发环境配置**

### 开发环境 (Development)

```bash
# env.development
NODE_ENV=development
NUXT_MOCK_ENABLED=false
NUXT_PUBLIC_API_BASE=http://192.168.232.180:51000
```

**代理配置:**

- `/api` → `http://192.168.232.180:51000/api`
- `/md` → `http://192.168.232.180:51000/md`

### 测试环境 (Test)

```bash
# env.test
NODE_ENV=test
NUXT_MOCK_ENABLED=false
NUXT_PUBLIC_API_BASE=https://m.hismk.club
```

**代理配置:**

- `/api` → `https://m.hismk.club/api`
- `/obs` → `https://m.hismk.club/obs`

### Mock环境 (Mock)

```bash
# env.mock
NODE_ENV=development
NUXT_MOCK_ENABLED=true
NUXT_PUBLIC_API_BASE=http://localhost:3000
```

**特性:**

- ✅ 无需代理，直接使用本地 `server/api/*`
- ✅ 无网络依赖，完全离线开发
- ✅ 无需AES解密，直接JSON响应

## 🏗️ **构建环境配置**

### 生产构建 (Production)

```bash
# env.production
NODE_ENV=production
NUXT_PUBLIC_API_BASE=https://192.168.232.182
NUXT_PUBLIC_CDN_HOST=https://cdn.yourdomain.com
NITRO_MINIFY=true
```

### 预发布构建 (Staging)

```bash
# env.staging
NODE_ENV=production
NUXT_PUBLIC_API_BASE=https://staging.hismk.club
NUXT_PUBLIC_CDN_HOST=https://staging-cdn.yourdomain.com
NITRO_MINIFY=true
```

## 🛠️ **构建脚本使用**

项目提供了智能构建脚本 `scripts/build.sh`：

```bash
# 基本语法
./scripts/build.sh [环境] [类型]

# 示例
./scripts/build.sh prod build      # 生产环境构建
./scripts/build.sh staging build   # 预发布环境构建
./scripts/build.sh test generate   # 测试环境静态生成
./scripts/build.sh dev build       # 开发环境构建
```

**支持的环境:** `dev`, `test`, `staging`, `prod`
**支持的类型:** `build`, `generate`

## 🎯 **智能切换机制**

### 环境检测逻辑

```typescript
// 开发服务器代理配置
function getProxyConfig() {
  const env = process.env.NODE_ENV
  const isMock = process.env.NUXT_MOCK_ENABLED === 'true'

  if (isMock) return undefined // Mock模式
  if (env === 'test') return testProxy // 测试环境
  return devProxy // 开发环境
}

// 构建时API配置
runtimeConfig: {
  public: {
    apiBase: process.env.NUXT_PUBLIC_API_BASE,
    mockEnabled: process.env.NUXT_MOCK_ENABLED === 'true'
  }
}
```

## 🧪 **测试指南**

### 开发环境测试

```bash
npm run dev
# 访问: http://localhost:3000
# 检查: API代理到 192.168.232.180:51000
```

### 测试环境测试

```bash
npm run dev:test
# 访问: http://localhost:3000
# 检查: API代理到 m.hismk.club
```

### Mock环境测试

```bash
npm run dev:mock
# 访问: http://localhost:3000
# 检查: API请求本地 /api/*
```

### 构建环境测试

```bash
# 构建并预览
npm run build:prod
npm run preview

# 或使用脚本
./scripts/build.sh prod build
npm run preview
```

## 🔍 **环境验证清单**

### 开发环境验证

- [ ] 服务器正常启动
- [ ] API代理正确配置
- [ ] 热重载工作正常
- [ ] Mock API响应正确

### 构建环境验证

- [ ] 构建无错误完成
- [ ] API请求指向正确服务器
- [ ] 静态资源加载正常
- [ ] CDN配置生效
- [ ] 代码压缩正常
- [ ] 路由跳转正常

## 📊 **构建优化**

### 代码分包

- `vue-vendor`: Vue核心库
- `vant-vendor`: Vant UI组件
- `pinia-vendor`: Pinia状态管理

### 构建分析

```bash
npm run build:prod
npx nuxi analyze
```

## 🎉 **优势特性**

1. **🔄 一键切换**: 不同命令即可切换环境
2. **🎯 自动配置**: 环境文件自动复制和加载
3. **🛡️ 类型安全**: TypeScript完整支持
4. **📊 智能代理**: 根据环境自动选择代理配置
5. **🔒 安全隔离**: 不同环境完全隔离
6. **🚀 开发效率**: Mock模式无网络依赖
7. **🎨 统一接口**: 所有环境使用相同的API调用方式
8. **🏗️ 构建优化**: 不同环境独立的构建优化策略
9. **📦 静态生成**: 支持所有环境的静态站点生成
10. **🤖 脚本自动化**: 智能构建脚本简化操作

---

**总结**: 多环境配置系统已完全配置完成，支持开发、测试、Mock三种开发环境和开发、测试、预发布、生产四种构建环境的无缝切换！
