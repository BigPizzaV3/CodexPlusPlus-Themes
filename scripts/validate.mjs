import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const idPattern = /^[a-z0-9][a-z0-9_-]{0,63}$/;
const shaPattern = /^[a-f0-9]{64}$/;
const allowedImages = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"]);
const requiredColors = [
  "background", "panel", "panelAlt", "accent", "accentAlt",
  "secondary", "highlight", "text", "muted", "line",
];

function fail(message) {
  throw new Error(message);
}

function safeRelative(value, label) {
  if (typeof value !== "string" || !value || value.includes("\\") || value.includes("\0")) {
    fail(`${label} must be a non-empty POSIX relative path`);
  }
  const normalized = path.posix.normalize(value);
  if (normalized !== value || normalized.startsWith("../") || path.posix.isAbsolute(value)) {
    fail(`${label} is unsafe: ${value}`);
  }
  return path.join(root, ...value.split("/"));
}

async function sha256(file) {
  return createHash("sha256").update(await readFile(file)).digest("hex");
}

const indexPath = path.join(root, "index.json");
const index = JSON.parse(await readFile(indexPath, "utf8"));
if (index.schemaVersion !== 1 || !Array.isArray(index.themes)) {
  fail("index.json must use schemaVersion 1 and contain a themes array");
}

const ids = new Set();
for (const item of index.themes) {
  if (!idPattern.test(item.id)) fail(`invalid theme id: ${item.id}`);
  if (ids.has(item.id)) fail(`duplicate theme id: ${item.id}`);
  ids.add(item.id);
  for (const field of ["name", "version", "author", "description", "license", "source_url"]) {
    if (typeof item[field] !== "string" || !item[field].trim()) fail(`${item.id}.${field} is required`);
  }
  if (!Array.isArray(item.tags)) fail(`${item.id}.tags must be an array`);
  if (!shaPattern.test(item.theme_sha256) || !shaPattern.test(item.image_sha256)) {
    fail(`${item.id} has an invalid SHA-256 value`);
  }

  const themePath = safeRelative(item.theme, `${item.id}.theme`);
  const imagePath = safeRelative(item.image, `${item.id}.image`);
  const previewPath = safeRelative(item.preview, `${item.id}.preview`);
  const expectedPrefix = `themes/${item.id}/`;
  if (![item.theme, item.image, item.preview].every((value) => value.startsWith(expectedPrefix))) {
    fail(`${item.id} assets must stay under ${expectedPrefix}`);
  }
  const licensePath = safeRelative(`${expectedPrefix}LICENSE.md`, `${item.id}.license`);
  if (!allowedImages.has(path.extname(imagePath).toLowerCase())) fail(`${item.id} image format is unsupported`);
  if (!allowedImages.has(path.extname(previewPath).toLowerCase())) fail(`${item.id} preview format is unsupported`);

  const [themeStat, imageStat, previewStat, licenseStat] = await Promise.all([
    stat(themePath), stat(imagePath), stat(previewPath), stat(licensePath),
  ]);
  if (!themeStat.isFile() || themeStat.size > 256 * 1024) fail(`${item.id} theme.json is invalid or too large`);
  if (!imageStat.isFile() || imageStat.size > 16 * 1024 * 1024) fail(`${item.id} image is invalid or too large`);
  if (!previewStat.isFile() || previewStat.size > 1024 * 1024) fail(`${item.id} preview is invalid or too large`);
  if (!licenseStat.isFile() || licenseStat.size > 64 * 1024) fail(`${item.id} LICENSE.md is invalid or too large`);

  const theme = JSON.parse(await readFile(themePath, "utf8"));
  if (theme.schemaVersion !== 1 || theme.id !== item.id || theme.name !== item.name) {
    fail(`${item.id} theme identity does not match index.json`);
  }
  if (!theme.colors || requiredColors.some((key) => typeof theme.colors[key] !== "string" || !theme.colors[key])) {
    fail(`${item.id} theme colors are incomplete`);
  }
  if (await sha256(themePath) !== item.theme_sha256) fail(`${item.id} theme_sha256 does not match`);
  if (await sha256(imagePath) !== item.image_sha256) fail(`${item.id} image_sha256 does not match`);
}

console.log(`Validated ${index.themes.length} theme(s).`);
