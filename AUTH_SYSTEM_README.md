# 🔐 HiSMK 认证系统文档

## 📱 功能概述

### ✅ 已完成功能

1. **登录页面** (`/login`)
   - 1:1 复原设计图UI
   - 蓝色烟雾动画背景效果
   - 国家代码选择器 (支持10个国家)
   - 邮箱验证码登录
   - 用户协议确认
   - 渐变登录按钮

2. **个人资料页面** (`/profile`)
   - 1:1 复原设计图UI
   - 用户头像和背景图
   - 积分显示系统
   - 用户统计数据 (Posts/Likes/Appointments)
   - Stories/Articles/Reels 标签页
   - 游客状态和登录状态切换

3. **Mock API 系统**
   - 使用 Nuxt Server API
   - 完整的认证接口模拟
   - 真实的API响应结构

## 🚀 快速测试

### 1. 启动项目

```bash
npm run dev
```

### 2. 测试路径

1. **主页** → 点击 "🔐 登录测试"
2. **登录页面** → 填写信息并登录
3. **个人资料页面** → 查看用户信息

### 3. 测试数据

- **邮箱**: `1029051@gmail.com` (预填)
- **验证码**: `4900` (预填)
- **国家**: 英国 🇬🇧 (默认)

## 📂 文件结构

```
app/
├── constants/auth.ts           # 认证相关常量和类型
├── api/auth.ts                 # 认证API服务层
├── composables/auth.ts         # 认证Store和交互逻辑
├── pages/
│   ├── login/index.vue         # 登录页面
│   └── profile/index.vue       # 个人资料页面
└── components/
    ├── ShopCard.vue           # 商店卡片 (已优化)
    ├── ShopVideoCard.vue      # 视频商店卡片 (已优化)
    └── WaterfallLayout.vue    # 瀑布流布局

server/api/
├── auth/
│   ├── hasLogin.get.ts         # 登录状态检查
│   └── h5Register.post.ts      # 用户注册/登录
├── hibackend/
│   ├── h5InitPage/
│   │   ├── sendMailCaptcha.post.ts    # 发送邮箱验证码
│   │   └── getInfoByh5.get.ts         # 获取用户信息
│   ├── myStatistics/
│   │   ├── myBalance.get.ts           # 获取用户余额
│   │   └── my.get.ts                  # 获取用户统计
│   └── pointsRule/backend/
│       └── detailByCode/[code].get.ts # 获取积分规则
└── shops/
    ├── index.get.ts            # 获取商店列表
    └── search.get.ts           # 搜索商店
```

## 🔧 API 接口说明

### 认证相关接口

#### 1. 检查登录状态

```
GET /api/auth/hasLogin
Response: { "code": 200, "msg": "success", "data": { "hasLogin": false } }
```

#### 2. 发送邮箱验证码

```
POST /api/hibackend/h5InitPage/sendMailCaptcha
Body: { "emailAddress": "1029051@gmail.com", "sendSource": "normal" }
Response: { "code": 200, "msg": "success", "data": "4900" }
```

#### 3. 用户注册/登录

```
POST /api/auth/h5Register
Body: {
  "emailAddress": "1029051@gmail.com",
  "captchaCode": "4900",
  "evaluateType": "scan_code",
  "isoCountryCode": "GBR",
  "age": 21,
  "source": ""
}
Response: {
  "code": 200,
  "msg": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzUxMiJ9...",
    "expires_in": 43200,
    "hasRegister": false,
    "age": 21
  }
}
```

#### 4. 获取用户信息

```
GET /api/hibackend/h5InitPage/getInfoByh5
Response: { "code": 200, "msg": "Operation successful.", "data": {...}, "success": true }
```

#### 5. 获取用户余额

```
GET /api/hibackend/myStatistics/myBalance
Response: { "code": 200, "msg": "success", "data": { "balance": "153", ... } }
```

#### 6. 获取用户统计

```
GET /api/hibackend/myStatistics/my
Response: { "code": 200, "msg": "success", "data": { "works": {...}, ... } }
```

#### 7. 获取积分规则

```
GET /api/hibackend/pointsRule/backend/detailByCode/scan_register
Response: { "code": 200, "msg": "success", "data": { "pointsValue": 20, ... } }
```

## 💻 技术实现

### 1. 状态管理 (Pinia)

```typescript
// useAuthStore - 认证状态管理
- isLoggedIn: 登录状态
- token: 访问令牌
- userInfo: 用户信息
- userBalance: 用户余额
- userStatistics: 用户统计
```

### 2. 组件架构

```typescript
// 登录页面组件
-响应式表单数据
- 国家代码选择器
- 验证码发送逻辑
- 用户协议确认
- 表单验证和提交

// 个人资料页面组件
- 条件渲染 (登录 / 游客状态)
- 动态数据绑定
- 统计数据计算
- 头像和背景处理
```

### 3. UI设计特色

```css
// 登录页面
- 蓝色渐变背景 (blue-900 → purple-900)
- 动态烟雾效果 (CSS动画)
- 毛玻璃输入框效果
- 渐变登录按钮 (orange → pink → purple)

// 个人资料页面
- 几何图案背景
- 圆形头像设计
- 紫色主题色调
- 卡片式布局
```

## 🎯 核心特性

### 1. 组件解耦设计

- **数据层**: Constants + API Services
- **逻辑层**: Composables + Store
- **视图层**: Vue Components
- **样式层**: Tailwind CSS + 自定义CSS

### 2. TypeScript 支持

- 完整的类型定义
- 接口规范化
- 类型安全的API调用

### 3. 响应式设计

- 移动端优先
- 适配各种屏幕尺寸
- 符合现代UI标准

### 4. Vant4 组件集成

- van-button: 按钮组件
- van-checkbox: 复选框
- van-icon: 图标系统
- van-popup: 弹窗组件
- van-picker: 选择器

## 🔄 数据流

```
1. 用户操作 → 2. Composable处理 → 3. Store状态更新 → 4. API调用 → 5. UI更新
```

## 🚦 测试检查项

### 登录页面测试

- [ ] 背景动画效果正常
- [ ] 国家代码选择器工作
- [ ] 邮箱输入验证
- [ ] 验证码发送功能
- [ ] 用户协议勾选
- [ ] 登录按钮Loading状态
- [ ] 表单验证提示

### 个人资料页面测试

- [ ] 游客状态显示正确
- [ ] 登录后数据加载
- [ ] 积分显示正常
- [ ] 统计数据准确
- [ ] 头像上传按钮
- [ ] 标签页切换
- [ ] vConsole按钮显示

### 系统集成测试

- [ ] 登录成功后跳转
- [ ] 用户状态持久化
- [ ] 登出功能正常
- [ ] 路由保护机制
- [ ] Token管理

## ⚡ 性能优化

1. **懒加载**: 路由级别代码分割
2. **状态持久化**: Pinia persist插件
3. **API缓存**: 智能数据缓存
4. **组件复用**: 高度可复用的组件设计

## 🛡️ 安全措施

1. **Token管理**: 自动存储和清理
2. **路由保护**: 登录状态检查
3. **表单验证**: 前端数据验证
4. **错误处理**: 友好的错误提示

## 📱 兼容性

- ✅ **移动端**: iOS Safari, Android Chrome
- ✅ **桌面端**: Chrome, Firefox, Safari, Edge
- ✅ **响应式**: 320px - 1920px
- ✅ **深色模式**: 自适应系统主题

## 🎨 设计亮点

1. **1:1 还原**: 完全按照设计图实现
2. **动画效果**: 流畅的过渡动画
3. **视觉层次**: 清晰的信息架构
4. **交互反馈**: 即时的操作响应
5. **品牌一致**: 统一的设计语言

这个认证系统为HiSMK应用提供了完整的用户登录和个人资料管理功能，具备现代化的UI设计和可靠的技术架构。
