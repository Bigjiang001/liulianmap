# 榴莲地图 · 曼谷 V2

面向 iPhone 的中文 PWA。探索地图、区域/品种/口感筛选、导航、收藏、购买体验、照片、评论点赞、口碑榜、地点补充与管理员审核。

公开网址：https://durian-map-bangkok.bigjiang001.chatgpt.site/

## V2

- 15 个有来源的地点，包括一个市场区域、该市场三个独立商家及其他店铺；每条都有来源和位置精度提示。没有虚构评分、价格、营业或库存。
- 重叠市场标记可展开选择。导航使用店名和地址搜索；部分地图点是道路或地区中心，不能当成店门口。
- 店铺电话、官方联系入口、可分享的 `?place=` 地点链接。
- 完整数据库评分聚合、星级分布；店铺评价每页 20 条，可搜索、筛选带图、按最新或点赞数排序。
- 社区口碑榜至少三位独立评价者入榜，每人取最新一次评分；公式详见界面和 `docs/RESEARCH_V2.md`。
- 手机照片自动缩至最长边 1600px 并重编码 JPEG，不保留 EXIF 定位信息。无法解码的 HEIC 提示转换。
- 写入、上传按已登录用户限流；同人同店同日只允许一条有效体验。未发布照片仅上传者可见；隐藏体验的照片不再公开访问。

## 运行

Node 22.13+，`npm ci`，`npm run build`。

首次本地运行按顺序执行每个 `drizzle/*.sql`：

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_dusty_invaders.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_ambiguous_mastermind.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0002_flowery_molecule_man.sql
npm run dev
```

已有数据库勿重复执行迁移。本地模拟登录仅开发模式提供，不能部署到任意无身份网关环境后直接信任请求头。

## 后端与 GitHub

运行栈为 Vinext / React / Cloudflare Workers / D1 / R2。生产使用受管理的 Sites 身份网关，公开浏览无需登录，发帖收藏需要 ChatGPT 登录。

GitHub 适合存放源码与持续检查；GitHub Pages 不能直接运行 D1/R2 社区后端。完整公开应用仍运行在上述受管理服务。把代码拷贝到普通 Workers 之前必须重新接入可信认证网关，不能信任客户端发送的身份头。不要把 GitHub 源码备份称为后端迁移。

管理员已由私有第一版的站主身份确认，并通过生产 `ADMIN_USER_ID` secret 固定。旧数据库 owner 仅用作已设置记录的兼容回退。代码不再任命第一个访问者；全新环境必须由维护者显式配置管理员。新注册默认随机昵称，不公开邮件或自动使用真名。

用户内容按文本渲染，服务端校验同源、登录、字段、图片魔数和照片所有权。地点补充经审核才进入地图；举报可隐藏体验。社交反作弊为初步限流和人数门槛，不能保证抵抗有组织多账号刷分。

## 数据与图片

来源、研究和地理位置处理方法见 `docs/RESEARCH_V2.md`。来源整理日期不是实地核实日期。版权评价文字、平台评分和商家照片未抓取导入。

`public/durian-hands.jpg` 是通用主题照片，不是店铺照片：Hanna Lazar / Unsplash，https://unsplash.com/photos/hands-holding-a-freshly-cut-durian-fruit-RRyfYKqx0-Y 。

地图使用 OpenStreetMap 在线标准瓦片，不预取、不离线缓存。定位仅用户点击请求，在设备内计算直线距离，不上传数据库。PWA 需要联网。

## 验证

TypeScript、生产 Worker 构建、本地真实 D1/R2 集成与手机布局检查。匿名写入拒绝、CSRF、日期评分校验、照片隐私/上传/公开读取、重复发布、点赞幂等、评论、评论检索与带图筛选、隐藏内容和频率限制均通过。

225 条仅本地测试评价验证：全量评分超过首页最近 200 条限制；12 页累计没有遗漏或重复；独立评价者计数与每人最新评分正确。所有测试数据只存在忽略的 `.wrangler`，不会打包进线上。

社区首页和个人页当前读取最近 200 条体验；店铺详情有独立分页，评分聚合为全量。店铺分页最多访问至 10000 偏移；评论每页最多 1000 条。上线后可按实际访问量升级查询和地图瓦片服务。

### V3 更新

加入有署名与许可的 Or Tor Kor 市场历史实景、3 段官方嵌入公开视频、3 条有作者与日期的外部试吃摘要；另提供每家店 Google 地图照片与评价入口。外部资料与本站社区评分分开。评价可按 1–5 星筛选、最高／最低评分排序。口碑页加入按试吃目的整理的寻味指南，iPhone 店铺卡片与底栏、照片放大体验更新。素材来源与使用方式见 `docs/RESEARCH_V3.md`。
