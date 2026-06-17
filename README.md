# dewu-mall-front

一个基于 Vue 3 + Vite + TailwindCSS 的移动端优先类得物电商前端项目。项目使用本地 mock 数据模拟商品、分类、购物车、订单、用户信息等业务流程，不依赖后端服务，适合作为电商前端课程设计、作品集 Demo 或 Vue3 练习项目。

## 技术栈

- Vue 3
- Vite
- Vue Router
- TailwindCSS
- JavaScript
- LocalStorage 本地持久化
- 本地 mock 数据

## 页面功能

- 首页：顶部搜索栏、横向分类 Tab、服务保障标签、Banner、商品瀑布流。
- 分类页：左侧分类栏，右侧品牌宫格和商品列表。
- 商品列表页：分类筛选、关键词筛选、综合/销量/价格排序。
- 商品详情页：商品轮播图、价格、标签、尺码选择、收藏、加入购物车、立即购买。
- 搜索页：关键词输入、热门搜索、实时商品筛选结果。
- 购物车页：多商品展示、勾选、全选、数量加减、删除、底部结算栏。
- 订单确认页：收货地址、商品清单、金额汇总、提交订单。
- 订单列表页：订单卡片、状态筛选、订单状态切换。
- 个人中心页：用户信息、订单入口、收藏、购物车、鉴别、优惠券、地址管理、浏览历史入口。
- 登录页：本地 mock 登录流程。

## 运行步骤

```bash
npm install
npm run dev
```

默认开发地址：

```text
http://127.0.0.1:5173/
```

生产构建：

```bash
npm run build
```

本地预览构建结果：

```bash
npm run preview
```

## 项目结构

```text
dewu-mall-front/
├─ public/
│  └─ images/
│     └─ products/        # 本地商品图片资源
├─ src/
│  ├─ components/         # 公共组件
│  ├─ layouts/            # 页面布局
│  ├─ mock/               # 本地 mock 数据
│  ├─ pages/              # 页面视图
│  ├─ router/             # Vue Router 配置
│  ├─ stores/             # 本地状态管理
│  ├─ App.vue
│  ├─ main.js
│  └─ style.css
├─ index.html
├─ package.json
└─ vite.config.js
```

## 项目截图位置

建议将项目截图保存到：

```text
public/screenshots/
```

推荐截图：

- 首页：`public/screenshots/home.png`
- 分类页：`public/screenshots/category.png`
- 商品详情页：`public/screenshots/product-detail.png`
- 购物车页：`public/screenshots/cart.png`
- 个人中心页：`public/screenshots/profile.png`

在 README 中引用截图示例：

```md
![首页截图](public/screenshots/home.png)
```

## GitHub 提交说明

初始化 Git 仓库：

```bash
git init
git add .
git commit -m "feat: init dewu mall front project"
```

关联远程仓库：

```bash
git remote add origin https://github.com/your-username/dewu-mall-front.git
git branch -M main
git push -u origin main
```

后续提交建议：

```bash
git add .
git commit -m "feat: optimize mall pages and interactions"
git push
```

## 说明

- 当前项目为纯前端 Demo，数据来自 `src/mock/data.js`。
- 购物车、收藏、订单、用户信息等状态使用 LocalStorage 做本地持久化。
- 商品图片部分使用本地资源，部分使用公开图片链接，仅用于前端页面展示。
