export const CATEGORIES = {
  essay: {
    ja: 'エッセイ',
    color: 'var(--nc)',
    colorRgb: '74,124,138',
    desc: '日常の中の違和感、心の奥底にある感情を、ありのままの言葉で綴る。',
  },
  fiction: {
    ja: '私小説',
    color: 'var(--np)',
    colorRgb: '139,107,107',
    desc: '実体験をベースに、人生の断片を物語として再構築する。',
  },
  column: {
    ja: 'コラム',
    color: 'var(--nv)',
    colorRgb: '107,107,138',
    desc: '社会・文化・人間関係について、独自の視点で切り込む。',
  },
  diary: {
    ja: '日記',
    color: 'var(--ng)',
    colorRgb: '90,138,107',
    desc: '日々の暮らしの中から、小さな気づきを記録する。',
  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
