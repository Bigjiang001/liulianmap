# 榴莲地图（茜茜找榴莲）· 曼谷

访问 **https://bigjiang001.github.io/liulianmap/**。GitHub Pages 直接运行网页，无跳转，无需登录 ChatGPT。

当前为地图浏览版：15 个公开来源地点、交互地图、搜索筛选、导航、真实来源照片及探店摘要、手机本机收藏、iPhone 主屏幕入口。社区上传、评分、评论尚未开放，不展示虚构评价。

原完整社区后端代码保留在 app/api、db、drizzle，未来接入独立后端时继续使用。静态版本不会请求原 Sites 网站或信任 ChatGPT 请求头。

开发：`npm ci`，`npm run dev:pages`。构建：`npm run build:pages`，产物 docs/。main/docs 为 GitHub Pages 发布源。资料来源见 research/RESEARCH_V3.md。

手机版：上方地图固定，下方店铺列表独立滚动；点击店铺定位并突出地图标记，点击“详情”展开资料。
