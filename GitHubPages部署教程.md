# GitHub Pages 部署教程（PWA 直接安装，最简单方案）

> 适用：`cantonese30-web/`（PWA 版）
> 效果：部署后手机浏览器打开网址 →「添加到主屏幕」→ 全屏运行，**无需安装 APK**，支持离线使用

---

## 一、原理（30秒看懂）

```
你的电脑（cantonese30-web/ 文件夹）
        │  git push
        ▼
GitHub 仓库 → GitHub Pages 免费托管（自动生成 https://你的用户名.github.io/仓库名/）
        │  手机浏览器打开
        ▼
PWA：添加到主屏幕 = 图标 + 全屏 + 离线可用（manifest.json + sw.js 已配置好）
```

---

## 二、详细步骤（约10分钟）

### 第1步：在 GitHub 上创建仓库
1. 登录 [github.com](https://github.com)
2. 右上角 **+** → **New repository**
3. 填写：
   - **Repository name**：`cantonese30`（或任意英文名）
   - 可见性：**Public**（免费托管必需）
   - 不要勾选 "Add a README"（避免冲突）
4. 点 **Create repository**

### 第2步：把项目推到 GitHub（两种方式任选）

**方式A：网页上传（最简单，不需要命令行）**
1. 在刚创建的仓库页，点 **Add file → Upload files**
2. 把 `cantonese30-web/` **文件夹里的所有内容**拖进去：
   ```
   .nojekyll            ← 隐藏文件也要传！（防止 Jekyll 干扰）
   index.html
   app.js
   style.css
   data.js
   storage.js
   wordcards.js
   sw.js
   manifest.json
   icons/（整个文件夹）
   ```
   > 注意：`APK打包教程.md`、`package.json`、`capacitor.config.json`、`README.md` 是给开发者看的，可以传也可以不传（不影响运行）
3. 点 **Commit changes**

**方式B：命令行推送（推荐，方便以后更新）**
```bash
# 1. 进入项目目录
cd cantonese30-web/

# 2. 初始化 git 并提交
git init
git add .
git commit -m "PWA v1.1 30天粤语入门助手"

# 3. 关联远程仓库（换成你的用户名和仓库名）
git branch -M main
git remote add origin https://github.com/你的用户名/cantonese30.git
git push -u origin main
```

### 第3步：开启 GitHub Pages
1. 仓库页 → **Settings**（齿轮图标）
2. 左侧菜单 → **Pages**
3. **Build and deployment** 区域：
   - Source 选 **Deploy from a branch**
   - Branch 选 **main** + 目录选 **/ (root)**
   - 点 **Save**
4. 等 1-2 分钟，页面顶部会出现：
   ```
   Your site is live at https://你的用户名.github.io/cantonese30/
   ```

### 第4步：验证 + 手机安装
1. 电脑浏览器打开上面的网址，确认能正常显示
2. **手机**打开同一网址（Chrome/Edge 最佳）
3. 浏览器菜单（⋮）→ **添加到主屏幕 / Add to Home Screen**
4. 桌面出现「粤语30天」图标，点击即全屏运行
5. 首次打开后自动缓存，之后**飞行模式也能用**（离线）

---

## 三、以后更新内容怎么办？

改完本地文件后重新推送即可，GitHub Pages 自动重新部署（约1分钟生效）：

```bash
cd cantonese30-web/
git add .
git commit -m "更新说明"
git push
```

**重要**：改了 `app.js` / `style.css` / `data.js` 等文件后，记得把 `sw.js` 里的版本号 +1，否则已安装用户拿不到新版：
```js
// sw.js 第5行
const CACHE_NAME = 'cantonese30-v2';  // 改成 v3、v4...每次更新都+1
```

---

## 四、常见问题

| 问题 | 解决 |
|---|---|
| 网址打不开 | 确认仓库是 Public；检查 Settings→Pages 的 branch 和目录是否正确；等1-2分钟 |
| 手机上"添加到主屏幕"灰色 | 用 Chrome/Edge 打开；确认网址是 https（GitHub Pages 自动是 https） |
| 图标不显示 | 确认 `icons/icon-192.png`、`icons/icon-512.png` 已上传且路径正确 |
| 更新后手机还是旧版 | sw.js 版本号 +1；手机上删除主屏幕图标重新添加，或浏览器设置里清除站点数据 |
| 域名太长想自定义 | Settings→Pages→Custom domain 填自己的域名（需另外购买） |

---

## 五、对比 APK 方案

| | GitHub Pages PWA（本方案） | APK 打包 |
|---|---|---|
| 难度 | ⭐ 简单，10分钟 | ⭐⭐⭐ 需装 Android Studio |
| 安装 | 添加到主屏幕 | 直接安装 APK |
| 更新 | 推送即更新（自动） | 要重新打包发安装包 |
| 离线 | ✅ 支持 | ✅ 支持 |
| 上架商店 | ❌（仅浏览器入口） | ✅ 可上架 |

**建议**：先部署 PWA 用起来（零成本、更新快），真有上架/离线分发硬需求再打包 APK。

---

*教程版本：v1.0 · cantonese30-web · my-team*
