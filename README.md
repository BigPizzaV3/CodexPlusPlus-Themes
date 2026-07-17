# CodexPlusPlus Themes

Codex++ 的社区主题仓库。Codex++ 可以直接读取本仓库的静态清单，预览、安装和更新主题。

## 使用方式

在 Codex++ 中打开“皮肤管理”，进入“主题市场”，点击“刷新市场”后选择主题安装。安装完成后，主题会进入“我的主题”，由用户手动应用。

## 当前主题

- `Dream Skin 原版`：来自 Fei-Away/Codex-Dream-Skin。
- `Caishen Lite / Max / Readable`、`Export Night`、`Global Founder Bright`、`Mythic Guardian Noir`：来自 ChannelerH/codex-skin-packs 的原创公开主题包。
- `Codex Snow Skin`：迁移上游冰雪图片和 CSS 色彩令牌。
- `Glass Vision`：迁移上游水晶星球图片和设计色彩令牌。
- `午夜极光 / 琥珀黄昏 / 森野薄雾 / 赛博霓虹 / 樱粉晨曦`：来自 gh283249008/Codex-Cidala-Tiger-Skin 的 MIT 程序化抽象预设，不包含该项目中未授权再分发的角色主题。

Codex++ 主题包格式只包含图片、文字和色彩配置。Snow 与 Glass Vision 市场版本不包含原项目的完整 CSS、布局扩展或独立注入脚本，完整视觉实现请查看各主题的 `source_url`。

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

所有迁移主题均在各自目录保留作者、来源、迁移基准和上游许可证；不满足公开再分发条件的候选素材不会收入本仓库。
