# KURAGE ウェブマガジン — 運営ガイド

このプロジェクトは **Astro** で構築されたウェブマガジンです。
記事の追加・編集はMarkdownファイルを操作するだけで行えます。

---

## 記事を追加する

`src/content/articles/` フォルダに `.md` ファイルを作成します。

### ファイル名の付け方
- 半角英数字とハイフンのみ使用（例: `shizuka-na-yoru.md`）
- 日本語タイトルをローマ字で短く表現

### テンプレート

```markdown
---
title: "記事タイトル"
author: "著者名"
category: "essay"
date: 2026-03-10
readingMinutes: 12
excerpt: "記事一覧に表示される抜粋文（1〜2文）"
draft: false
---

ここに本文を書きます。

## 見出し（h2）

段落テキスト段落テキスト。

> 引用文はこのように書きます。
```

### カテゴリ（4種類のみ）
| 値 | 表示名 |
|---|---|
| `essay` | エッセイ |
| `fiction` | 私小説 |
| `column` | コラム |
| `diary` | 日記 |

### オプション項目（必要な場合のみ追加）

```yaml
featured: true        # トップページのカルーセルに表示
featuredOrder: 1      # カルーセル内の順番（1〜3）
rankingOrder: 1       # ランキングの順位
rankingViews: 2340    # ランキングの閲覧数表示
series: "series-slug" # 所属する連載のスラッグ
episodeNumber: 1      # 連載の話数
coverImage: "/img/articles/filename.jpg"  # カバー画像
draft: true           # 下書き（サイトに公開されない）
```

### カルーセル（トップ画面のスライド）を変更する
1. 表示したい記事のfrontmatterに `featured: true` と `featuredOrder: 1〜3` を追加
2. 最大3件まで。他の記事から `featured` を外すことを忘れずに

### ランキングを変更する
1. 表示したい記事に `rankingOrder: 1` と `rankingViews: 2340` を追加
2. 数字が小さい順に上位に表示される

---

## 連載を追加する

`src/content/series/` フォルダに `.md` ファイルを作成します。

```markdown
---
title: "連載タイトル"
author: "著者名"
category: "essay"
totalEpisodes: 12
description: "連載の説明文"
coverImage: "/img/series/filename.jpg"
---

連載の詳しい説明（任意）
```

連載に記事を紐づけるには、記事側のfrontmatterに以下を追加：
```yaml
series: "ファイル名（.md除く）"
episodeNumber: 1
```

進捗バーは自動計算されます（公開済みエピソード数 / totalEpisodes）。

---

## スタッフを追加する

`src/content/staff/` フォルダに `.md` ファイルを作成します。

```markdown
---
name: "名前"
role: "役職（日本語）"
roleEn: "Role in English"
bio: "プロフィール文"
photo: "/img/staff/filename.jpg"
order: 1
---
```

`order` の数字が小さい順に表示されます。

---

## 画像の追加

1. 画像ファイルを `public/img/` 以下に配置
   - 記事画像: `public/img/articles/`
   - 連載画像: `public/img/series/`
   - スタッフ写真: `public/img/staff/`
2. frontmatterで `/img/articles/filename.jpg` のように参照

---

## 開発コマンド

```bash
# 開発サーバー起動（http://localhost:4321）
npm run dev

# 本番ビルド（dist/ フォルダに出力）
npm run build

# ビルド結果のプレビュー
npm run preview
```

---

## ファイル構成（重要なもの）

```
src/
├── content/
│   ├── articles/    ← ★ 記事を追加する場所
│   ├── series/      ← ★ 連載を追加する場所
│   └── staff/       ← ★ スタッフを追加する場所
├── components/      ← UIパーツ（通常は触らない）
├── layouts/         ← ページの枠組み（通常は触らない）
├── pages/           ← ページ定義（通常は触らない）
└── styles/          ← CSS（通常は触らない）
public/
├── img/             ← ★ 画像を置く場所
└── scripts/         ← アニメーション（触らない）
```

---

## 注意事項

- `draft: true` にすると記事は非公開になります（ビルドされません）
- `date` は `YYYY-MM-DD` 形式で書いてください
- カテゴリは `essay` `fiction` `column` `diary` の4つのみ。他の値はエラーになります
- ファイル名に日本語やスペースは使わないでください
- 画像は事前に `public/img/` に配置してからfrontmatterで参照してください
