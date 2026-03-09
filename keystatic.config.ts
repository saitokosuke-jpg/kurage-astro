import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: process.env.NODE_ENV === 'production'
    ? {
        kind: 'github',
        repo: 'saitokosuke-jpg/kurage-astro',
      }
    : { kind: 'local' },

  ui: {
    brand: { name: 'KURAGE 管理画面' },
  },

  collections: {
    // ═══════════════════════════════
    //  記事（Articles）
    // ═══════════════════════════════
    articles: collection({
      label: '記事',
      slugField: 'title',
      path: 'src/content/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'タイトル', validation: { isRequired: true } },
        }),
        author: fields.text({
          label: '著者',
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'カテゴリ',
          options: [
            { label: 'エッセイ', value: 'essay' },
            { label: '小説', value: 'fiction' },
            { label: 'コラム', value: 'column' },
            { label: '日記', value: 'diary' },
          ],
          defaultValue: 'essay',
        }),
        date: fields.date({
          label: '公開日',
          validation: { isRequired: true },
        }),
        readingMinutes: fields.integer({
          label: '読了時間（分）',
          validation: { isRequired: true, min: 1 },
          defaultValue: 5,
        }),
        excerpt: fields.text({
          label: '抜粋（一覧に表示される説明文）',
          multiline: true,
          validation: { isRequired: true },
        }),
        featured: fields.checkbox({
          label: 'トップページのカルーセルに表示',
          defaultValue: false,
        }),
        featuredOrder: fields.integer({
          label: 'カルーセル表示順（1が最初）',
          description: 'カルーセルに表示する場合のみ設定',
        }),
        rankingOrder: fields.integer({
          label: 'ランキング順位',
          description: '人気記事ランキングに表示する場合のみ設定',
        }),
        rankingViews: fields.integer({
          label: 'ランキング閲覧数',
          description: 'ランキング表示用の閲覧数',
        }),
        series: fields.text({
          label: '連載スラッグ',
          description: '連載に属する場合、連載のスラッグを入力',
        }),
        episodeNumber: fields.integer({
          label: '話数',
          description: '連載の何話目か',
        }),
        coverImage: fields.text({
          label: 'カバー画像パス',
          description: '例: /img/cover.png',
        }),
        draft: fields.checkbox({
          label: '下書き（公開しない）',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: '本文',
        }),
      },
    }),

    // ═══════════════════════════════
    //  連載（Series）
    // ═══════════════════════════════
    series: collection({
      label: '連載',
      slugField: 'title',
      path: 'src/content/series/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'タイトル', validation: { isRequired: true } },
        }),
        author: fields.text({
          label: '著者',
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'カテゴリ',
          options: [
            { label: 'エッセイ', value: 'essay' },
            { label: '小説', value: 'fiction' },
            { label: 'コラム', value: 'column' },
            { label: '日記', value: 'diary' },
          ],
          defaultValue: 'essay',
        }),
        totalEpisodes: fields.integer({
          label: '全話数',
          validation: { isRequired: true, min: 1 },
        }),
        description: fields.text({
          label: '説明',
          multiline: true,
        }),
        coverImage: fields.text({
          label: 'カバー画像パス',
          description: '例: /img/series-cover.png',
        }),
        content: fields.markdoc({
          label: '詳細説明',
        }),
      },
    }),

    // ═══════════════════════════════
    //  スタッフ（Staff）
    // ═══════════════════════════════
    staff: collection({
      label: 'スタッフ',
      slugField: 'name',
      path: 'src/content/staff/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({
          name: { label: '名前', validation: { isRequired: true } },
        }),
        role: fields.text({
          label: '役職（日本語）',
          validation: { isRequired: true },
        }),
        roleEn: fields.text({
          label: '役職（英語）',
          validation: { isRequired: true },
        }),
        bio: fields.text({
          label: 'プロフィール',
          multiline: true,
          validation: { isRequired: true },
        }),
        photo: fields.text({
          label: '写真パス',
          description: '例: /img/staff-name.png',
          validation: { isRequired: true },
        }),
        order: fields.integer({
          label: '表示順',
          validation: { isRequired: true, min: 1 },
          defaultValue: 1,
        }),
        content: fields.markdoc({
          label: '詳細プロフィール',
        }),
      },
    }),
  },
});
