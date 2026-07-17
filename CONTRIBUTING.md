# 投稿指南

## 1. 新建主题目录

复制 `templates/theme-template` 到 `themes/<theme-id>`，填写配置并替换图片。主题 ID 必须满足：

```text
^[a-z0-9][a-z0-9_-]{0,63}$
```

## 2. 准备素材

- 原图文件不超过 16 MiB，格式限 `png`、`jpg`、`jpeg`、`webp`、`gif` 或 `bmp`。
- 缩略图不超过 1 MiB，建议使用 960 x 540 或相近的横向比例。
- 不接受仅有网络链接、需要登录下载或来源不明的素材。
- 人物、角色、商标和第三方作品必须在 `LICENSE.md` 中明确授权或使用依据。

## 3. 更新清单

在 `index.json` 的 `themes` 数组中新增一项。路径必须是仓库内相对路径，不能使用 URL、`..` 或反斜杠。

计算文件摘要：

```powershell
Get-FileHash themes/<theme-id>/theme.json -Algorithm SHA256
Get-FileHash themes/<theme-id>/image.png -Algorithm SHA256
```

将摘要以小写形式填入 `theme_sha256` 和 `image_sha256`。

## 4. 本地校验

```bash
node scripts/validate.mjs
```

## 5. 提交 Pull Request

一个 Pull Request 只投稿或更新一个主题。请附上主题截图、授权说明和测试结果。维护者合并后，Codex++ 用户刷新市场即可看到更新。
