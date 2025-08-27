#!/bin/bash

# 构建脚本 - 支持多环境构建
# 使用方法: ./scripts/build.sh [env] [type]
# env: dev, test, staging, prod (默认: prod)
# type: build, generate (默认: build)

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 默认参数
ENV=${1:-prod}
TYPE=${2:-build}

echo -e "${BLUE}🏗️  开始构建环境: ${ENV}, 类型: ${TYPE}${NC}"

# 验证环境参数
case $ENV in
  dev|development)
    ENV_FILE="env.development"
    ;;
  test)
    ENV_FILE="env.test"
    ;;
  staging)
    ENV_FILE="env.staging"
    ;;
  prod|production)
    ENV_FILE="env.production"
    ;;
  *)
    echo -e "${RED}❌ 错误: 不支持的环境 '$ENV'${NC}"
    echo -e "${YELLOW}💡 支持的环境: dev, test, staging, prod${NC}"
    exit 1
    ;;
esac

# 验证类型参数
case $TYPE in
  build|generate)
    ;;
  *)
    echo -e "${RED}❌ 错误: 不支持的构建类型 '$TYPE'${NC}"
    echo -e "${YELLOW}💡 支持的类型: build, generate${NC}"
    exit 1
    ;;
esac

# 检查环境文件是否存在
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}❌ 错误: 环境文件 '$ENV_FILE' 不存在${NC}"
    exit 1
fi

echo -e "${YELLOW}📁 复制环境文件: $ENV_FILE -> .env${NC}"
cp "$ENV_FILE" .env

echo -e "${YELLOW}🔧 设置Node.js版本...${NC}"
if command -v nvm &> /dev/null; then
    nvm use 23
fi

echo -e "${YELLOW}📦 检查依赖...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}🔄 安装依赖...${NC}"
    pnpm install
fi

echo -e "${YELLOW}🚀 开始${TYPE}...${NC}"
case $TYPE in
  build)
    NODE_ENV=production npm run build
    ;;
  generate)
    npm run generate
    ;;
esac

echo -e "${GREEN}✅ 构建完成!${NC}"
echo -e "${BLUE}📂 构建产物位置:${NC}"
if [ "$TYPE" = "generate" ]; then
    echo -e "   静态文件: ${YELLOW}.output/public/${NC}"
else
    echo -e "   服务端: ${YELLOW}.output/${NC}"
fi

echo -e "${BLUE}🚀 预览命令:${NC}"
echo -e "   ${YELLOW}npm run preview${NC}"

echo -e "${GREEN}🎉 ${ENV} 环境${TYPE}成功完成!${NC}" 