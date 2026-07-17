# CodexPlusPlus Themes

Codex++ 的社区主题仓库。Codex++ 可以直接读取本仓库的静态清单，预览、安装和更新主题。

## 使用方式

在 Codex++ 中打开“皮肤管理”，进入“主题市场”，点击“刷新市场”后选择主题安装。安装完成后，主题会进入“我的主题”，由用户手动应用。

## 投稿主题

欢迎通过 Pull Request 投稿。开始前请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)，并确保：

- 图片、字体和其他素材允许重新分发。
- `theme.json` 中不包含广告、脚本、密钥或远程代码。
- 主题 ID 全局唯一，只使用小写字母、数字、`-` 和 `_`。
- 同时提交展示缩略图，并在 `index.json` 中登记主题。
- 在主题目录的 `LICENSE.md` 中说明作者、来源和素材授权。

所有 Pull Request 都会运行结构、路径、文件大小和 SHA-256 校验。

## 仓库结构

```text
index.json
themes/
  theme-id/
    theme.json
    image.png
    preview.jpg
    LICENSE.md
```

主题清单与配置格式当前为 `schemaVersion: 1`。程序只会从本仓库下载清单中声明的相对路径。

## 来源与许可

仓库工具和清单结构采用 [MIT License](./LICENSE)。每个主题及其素材以主题目录内的 `LICENSE.md` 为准。

首个演示主题基于 [Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin)，保留原项目署名与素材来源说明。
