# 🚀 Nano Banana AI - 快速设置指南

## 📋 项目当前状态

### ✅ 已完成
1. **前端基础架构** - Next.js 15 + TypeScript
2. **深色科技风格UI** - 参考qwenimage.cc设计
3. **动漫角色库** - 16个角色（包括最新流行角色）
4. **粒子背景效果** - 动态交互粒子
5. **数据库模型** - Prisma schema已定义
6. **环境变量配置** - fal.AI密钥已配置

### 🔧 需要完成的设置

## 1️⃣ 设置Supabase数据库

1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目
3. 获取以下信息：
   - Project URL
   - Anon Key
   - Service Role Key
   - Database URL

4. 更新 `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=你的URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=你的SERVICE_KEY
DATABASE_URL=你的数据库URL
```

## 2️⃣ 设置Google OAuth

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建OAuth 2.0凭据
5. 添加回调URL:
   - 开发: `http://localhost:3000/api/auth/callback/google`
   - 生产: `https://你的域名/api/auth/callback/google`

6. 更新 `.env.local`:
```env
GOOGLE_CLIENT_ID=你的CLIENT_ID
GOOGLE_CLIENT_SECRET=你的CLIENT_SECRET
```

## 3️⃣ 生成NextAuth密钥

运行以下命令生成密钥：
```bash
openssl rand -base64 32
```

更新 `.env.local`:
```env
NEXTAUTH_SECRET=生成的密钥
```

## 4️⃣ 设置Stripe支付

1. 访问 [stripe.com](https://stripe.com)
2. 获取测试密钥
3. 创建产品和价格
4. 设置Webhook端点

更新 `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## 5️⃣ 初始化数据库

```bash
# 生成Prisma客户端
npx prisma generate

# 推送schema到数据库
npx prisma db push

# （可选）打开Prisma Studio查看数据
npx prisma studio
```

## 6️⃣ 本地运行测试

```bash
# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 7️⃣ 部署到Vercel

1. 推送代码到GitHub:
```bash
git add .
git commit -m "Complete setup with all features"
git push origin main
```

2. 在Vercel中:
   - 导入GitHub仓库
   - 添加所有环境变量
   - 部署

## 📊 功能测试清单

### 前端功能
- [ ] 首页加载正常
- [ ] 粒子背景动画流畅
- [ ] 角色选择页面正常
- [ ] 图库页面正常
- [ ] 响应式布局正常

### 用户系统
- [ ] Google登录功能
- [ ] 用户注册功能
- [ ] Session保持
- [ ] 退出登录

### AI生成
- [ ] 图片上传功能
- [ ] 提示词输入
- [ ] 角色选择
- [ ] 生成请求发送
- [ ] 结果显示

### 支付系统
- [ ] 价格显示
- [ ] Stripe支付流程
- [ ] 积分充值
- [ ] 交易记录

### 管理功能
- [ ] 用户仪表板
- [ ] 生成历史
- [ ] 积分余额显示
- [ ] 管理后台（admin用户）

## 🎯 已知的限制

1. **免费用户**: 10个初始积分
2. **生成限制**: 每次生成消耗1-3积分
3. **图片大小**: 最大10MB
4. **并发限制**: 同时最多3个生成任务

## 🚨 常见问题解决

### 1. Prisma连接错误
- 检查DATABASE_URL格式
- 确保数据库已创建
- 检查网络连接

### 2. Google登录失败
- 检查回调URL配置
- 确保OAuth凭据正确
- 检查NEXTAUTH_URL设置

### 3. fal.AI生成失败
- 检查API密钥
- 确认积分余额
- 查看控制台错误信息

### 4. Stripe支付问题
- 使用测试卡号: 4242 4242 4242 4242
- 检查Webhook配置
- 确认价格ID正确

## 📞 需要帮助？

如果遇到问题：
1. 检查控制台错误信息
2. 查看 `IMPLEMENTATION_PLAN.md`
3. 确认所有环境变量已设置

## 🎉 完成！

恭喜！你的Nano Banana AI平台已经准备就绪。

**核心功能**:
- ✅ 深色科技风UI
- ✅ 16个动漫角色
- ✅ fal.AI图像生成
- ✅ Google登录
- ✅ Stripe支付
- ✅ 用户管理系统

**下一步优化**:
- 添加更多动漫角色
- 优化生成速度
- 添加批量处理
- 实现API接口
- 移动端优化

祝你使用愉快！🚀
