# 安卓 APK 打包教程（保姆级）

> 适用：`cantonese30-web/`（PWA 版，30天粤语入门助手）
> 目标：把 Web 应用打包成安卓可安装的 `.apk` 文件

---

## 一、原理说明（30秒看懂）

```
cantonese30-web/（HTML+JS+CSS，纯本地无后端）
        │
        ▼ 用 Capacitor 包一层安卓壳（WebView 加载页面）
        ▼ 用 Android Studio / Gradle 编译
        ▼
  粤语30天.apk（可直接安装到安卓手机）
```

**为什么能这么打包**：你的应用是纯前端（数据在本地 `data.js`，进度存 localStorage），不需要服务器，天然适合 WebView 壳打包。Capacitor 是官方维护的桥接框架，生成的 APK 体验接近原生。

---

## 二、准备工作（一次性安装）

需要在一台**电脑**（Windows/Mac 均可）上安装：

| 工具 | 用途 | 下载 |
|---|---|---|
| **Node.js**（≥18） | 运行 npm 命令 | https://nodejs.org/ |
| **JDK 17**（Java） | 编译安卓代码 | https://adoptium.net/ （选 Temurin 17） |
| **Android Studio** | 安卓 SDK + 构建工具 | https://developer.android.com/studio |

**安装 Android Studio 后**还需要装 SDK：
1. 打开 Android Studio → Settings → Appearance & Behavior → System Settings → Android SDK
2. 勾选安装：**Android SDK Platform 34** + **Android SDK Build-Tools 34.0.0**
3. 记下 SDK 路径（Mac 通常是 `~/Library/Android/sdk`）

---

## 三、打包步骤（约20分钟，含首次下载依赖）

### 第1步：进入项目目录
```bash
cd cantonese30-web/
```

### 第2步：安装 Capacitor 依赖
```bash
npm install
```

### 第3步：添加安卓平台
```bash
npx cap add android
```
> 会生成 `android/` 目录（原生安卓工程，**不要手动删改**）

### 第4步：同步 Web 代码到安卓工程
```bash
npx cap sync android
```
> 每次修改了 `index.html`/`app.js`/`style.css` 后都要重新执行这一步

### 第5步：用 Android Studio 打开
```bash
npx cap open android
```

### 第6步：构建 APK（两种方式任选）

**方式A：Android Studio 界面操作（推荐新手）**
1. 菜单 Build → Build Bundle(s) / APK(s) → Build APK(s)
2. 等待底部进度条完成
3. 点右下角 "locate" 查看 APK 位置：
   `android/app/build/outputs/apk/debug/app-debug.apk`

**方式B：命令行**
```bash
cd android
./gradlew assembleDebug
# APK 输出位置：
# android/app/build/outputs/apk/debug/app-debug.apk
```

### 第7步：安装到手机
- 用数据线连接安卓手机（开启"USB调试"），然后：
  ```bash
  adb install android/app/build/outputs/apk/debug/app-debug.apk
  ```
- 或把 APK 文件通过微信/QQ/网盘发到手机，点击安装（需允许"安装未知来源应用"）

---

## 四、配置说明（可选）

### 修改应用名 / 图标
- 应用名：编辑 `capacitor.config.json` 的 `appName`（如改成"粤语学习30天"）
- 图标：替换 `android/app/src/main/res/mipmap-*/ic_launcher.png`（用你的设计图，各尺寸都要）

### 修改包名（上架应用商店才需要）
- `capacitor.config.json` 的 `appId`（如 `com.yourname.cantonese30`）
- 改后执行 `npx cap sync android` 重新同步

### 发布正式版 APK（release）
```bash
cd android
./gradlew assembleRelease
# 需要配置签名，见：https://developer.android.com/studio/publish/app-signing
```

---

## 五、常见问题

| 问题 | 解决 |
|---|---|
| `npx cap add android` 报错 | 先 `npm install`；确认 Node ≥18 |
| Gradle 下载慢/失败 | 配置国内镜像：编辑 `android/build.gradle` 的仓库为阿里云镜像 |
| APK 安装后白屏 | 确认执行过 `npx cap sync android`；WebView 需 Android 5.0+ |
| 需要访问网络资源 | Capacitor 默认允许 https，本地资源无需配置 |
| 想直接网页用（不打APK） | 把 `cantonese30-web/` 放任意静态服务器，手机浏览器打开即可，或 `npx serve . -l 8080` 本地预览 |

---

## 六、更省事的替代方案（不想装 Android Studio）

如果只是**自己用**，其实可以不打包 APK：

1. **PWA 直接安装**（推荐，最简单）：
   - 把 `cantonese30-web/` 上传到任意静态托管（GitHub Pages / Vercel / 腾讯云 COS 等）
   - 安卓手机 Chrome 打开网址 → 菜单"添加到主屏幕" → 全屏运行，**无需安装 APK**
   - 已配置 `manifest.json` + `sw.js`，支持离线使用

2. **在线打包平台**（不用装环境，但要上传代码）：
   - 微信云开发 / uni-app 云打包 / APICloud 等平台支持 Web 转 APK

---

*教程版本：v1.0 · cantonese30-web · my-team*
