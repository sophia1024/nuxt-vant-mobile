# 测试说明 - Vape Shop Discovery 系统

## 🚀 快速开始

### 1. 启动Mock模式

```bash
npm run dev:mock
```

### 2. 启动正常模式 (无Mock数据)

```bash
npm run dev
```

## ✅ 主要改进

### 1. 专业Mock插件系统

- ✅ 使用 `vite-plugin-mock` 和 `mockjs` 专业插件
- ✅ Mock数据存储在 `mock/shops.ts` 文件夹中
- ✅ 通过 `npm run dev:mock` 开启mock模式
- ✅ 20个随机生成的店铺数据，包含不同类型

### 2. Vant4组件优化

- ✅ 搜索图标：使用 `<van-icon name="search" />`
- ✅ 过滤按钮：使用 `<van-button icon="filter-o" />`
- ✅ 喜欢按钮：使用 `<van-button icon="like" />`
- ✅ 星级评分：使用 `<van-icon name="star" />`
- ✅ 播放按钮：使用 `<van-button icon="play" />`
- ✅ 标签：使用 `<van-tag>` 组件
- ✅ "See all"按钮：使用 `<van-button icon="arrow" />`

### 3. 字体大小优化

- ✅ 主标题 "Where to?"：从 `text-2xl` 增大到 `text-4xl`
- ✅ 副标题 "Nearby"、"Search Results"：从 `text-lg` 增大到 `text-xl`
- ✅ 店铺名称：从 `text-sm` 增大到 `text-base`
- ✅ 地址信息：从 `text-xs` 增大到 `text-sm`
- ✅ 评分信息：从 `text-xs` 增大到 `text-sm`
- ✅ 搜索结果计数：从 `text-sm` 增大到 `text-base`

## 🧪 测试功能

### 主要功能测试

1. **Mock数据系统**
   - 访问 `/discovery` 页面
   - 确认显示20个随机生成的店铺
   - 测试搜索功能（搜索 "Cloud", "Video", "Premium" 等关键词）

2. **UI组件测试**
   - 检查所有图标是否使用Vant图标
   - 验证字体大小是否清晰可读
   - 测试点赞功能（红心图标切换）
   - 测试视频播放按钮

3. **响应式布局**
   - 瀑布流两列布局
   - 不同高度的卡片（图片 vs 视频）
   - 加载状态显示

### 视觉对比

**之前**: 字体过小，难以阅读

- 主标题: `text-2xl` (24px)
- 店铺名: `text-sm` (14px)
- 地址: `text-xs` (12px)

**现在**: 字体清晰，易于阅读

- 主标题: `text-4xl` (36px) ⬆️ +50%
- 店铺名: `text-base` (16px) ⬆️ +14%
- 地址: `text-sm` (14px) ⬆️ +17%

## 📁 新增文件结构

```
mock/
└── shops.ts              # Mock数据和API端点

app/
├── components/
│   ├── ShopCard.vue      # 优化字体和Vant组件
│   ├── ShopVideoCard.vue # 优化字体和Vant组件
│   └── WaterfallLayout.vue
└── pages/discovery/
    └── index.vue         # 优化字体和Vant组件
```

## 🔧 技术改进

### Mock插件配置

```typescript
// nuxt.config.ts
vite: {
  plugins: process.env.NUXT_MOCK_ENABLED === 'true' ? [
    viteMockServe({
      mockPath: 'mock',
      enable: true,
      logger: true,
    })
  ] : [],
}
```

### API简化

- 移除内置mock逻辑
- 直接调用API端点
- Mock插件自动拦截请求

### 字体大小标准

参考项目中 `🌗 暗黑模式` 等功能的字体大小：

- 使用 `text-4xl`、`text-xl`、`text-base` 等较大字体
- 确保在移动端清晰可读
- 与项目整体设计风格保持一致

## ⚠️ 注意事项

1. **开发环境**: 使用 `npm run dev:mock` 进行开发和测试
2. **生产环境**: 使用 `npm run dev` 连接真实API
3. **依赖**: 新增 `vite-plugin-mock`、`mockjs`、`@types/mockjs`
4. **兼容性**: 保持与现有项目架构完全兼容
