import { config, fields, collection } from '@keystatic/core';

export default config({
  locale: 'ja-JP',

  storage: process.env.NODE_ENV === 'production'
    ? {
        kind: 'github',
        repo: 'saitokosuke-jpg/kurage-astro',
      }
    : { kind: 'local' },

  ui: {
    brand: { name: 'KURAGE 管理画面' },
    navigation: {
      'コンテンツ': ['articles', 'series'],
      '運営': ['staff'],
    },
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
        // ── 基本情報 ──
        title: fields.slug({
          name: {
            label: 'タイトル',
            description: '記事のタイトル。URLスラッグも自動生成されます',
            validation: { isRequired: true },
          },
        }),
        author: fields.text({
          label: '著者',
          description: '執筆者の名前',
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'カテゴリ',
          description: '記事の分類を選択',
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
          description: 'サイトに表示される日付',
          validation: { isRequired: true },
        }),
        readingMinutes: fields.integer({
          label: '読了時間（分）',
          description: '「約○分で読めます」と表示されます',
          validation: { isRequired: true, min: 1 },
          defaultValue: 5,
        }),
        excerpt: fields.text({
          label: '抜粋',
          description: '記事一覧やSNSシェア時に表示される説明文（2〜3行程度）',
          multiline: true,
          validation: { isRequired: true },
        }),
        coverImage: fields.text({
          label: 'カバー画像パス',
          description: 'SNSシェア時のサムネイル画像。例: /img/cover.png（未設定ならクラゲアイコン）',
        }),
        draft: fields.checkbox({
          label: '下書き',
          description: 'オンにすると公開されません',
          defaultValue: false,
        }),

        // ── トップページ掲載 ──
        featured: fields.checkbox({
          label: 'カルーセルに表示',
          description: 'オンにするとトップページのスライドショーに表示されます',
          defaultValue: false,
        }),
        featuredOrder: fields.integer({
          label: 'カルーセル表示順',
          description: '1が最初に表示。カルーセルに表示する場合のみ設定',
        }),

        // ── ランキング ──
        rankingOrder: fields.integer({
          label: 'ランキング順位',
          description: '1が1位。トップページの「今月の人気記事」に表示する場合のみ設定',
        }),
        rankingViews: fields.integer({
          label: 'ランキング閲覧数',
          description: 'ランキング横に表示する閲覧数の数字',
        }),

        // ── 連載設定 ──
        series: fields.text({
          label: '連載スラッグ',
          description: '連載に属する記事の場合、連載一覧にあるスラッグ（英字）を入力。例: kurage-ni-wa-hone-ga-nai',
        }),
        episodeNumber: fields.integer({
          label: '話数',
          description: '連載の何話目か。例: 8',
        }),

        // ── 本文 ──
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
          name: {
            label: 'タイトル',
            description: '連載タイトル。スラッグは記事の「連載スラッグ」欄に入力する値になります',
            validation: { isRequired: true },
          },
        }),
        author: fields.text({
          label: '著者',
          description: '連載の執筆者',
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
          description: '連載の予定話数',
          validation: { isRequired: true, min: 1 },
        }),
        description: fields.text({
          label: '説明',
          description: '連載一覧に表示される紹介文',
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
          name: {
            label: '名前',
            description: 'サイトに表示される名前',
            validation: { isRequired: true },
          },
        }),
        role: fields.text({
          label: '役職（日本語）',
          description: '例: 編集長、ライター',
          validation: { isRequired: true },
        }),
        roleEn: fields.text({
          label: '役職（英語）',
          description: '例: Editor in Chief, Writer',
          validation: { isRequired: true },
        }),
        bio: fields.text({
          label: 'プロフィール',
          description: 'スタッフカードに表示される自己紹介文',
          multiline: true,
          validation: { isRequired: true },
        }),
        photo: fields.text({
          label: '写真パス',
          description: 'プロフィール写真のパス。例: /img/staff-name.png',
          validation: { isRequired: true },
        }),
        order: fields.integer({
          label: '表示順',
          description: '1が最初に表示されます',
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
