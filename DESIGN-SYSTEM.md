# LandBridge運送会社 デザインシステムドキュメント

## 概要
このドキュメントは、LandBridge運送会社のランディングページで使用されているデザインシステムとコンポーネントライブラリについて説明します。

## デザイントーン
- **モダン / クリーン / 信頼性 / エコロジー志向**
- 広い余白とソフトシャドウを活用した視認性の高いデザイン
- 環境への配慮を表現する自然的な色彩

## カラーシステム

### ブランドカラー
```css
--color-primary-green: #2F7D32;  /* 環境配慮を表現するグリーン */
--color-primary-navy: #1F2A44;   /* 信頼性を表現するネイビー */
--color-accent-lime: #B6E53E;    /* アクセントカラー */
```

### 背景色
```css
--color-bg-off-white: #F7F7F2;   /* メイン背景色 */
--color-bg-white: #FFFFFF;       /* カード背景色 */
```

### テキストカラー
```css
--color-text-primary: #1F2A44;   /* 主要テキスト */
--color-text-secondary: #5A6376; /* 補助テキスト */
--color-text-tertiary: #8B92A3;  /* 第三階層テキスト */
```

### ステータスカラー
```css
--color-success: #2F7D32;
--color-warning: #F59E0B;
--color-error: #EF4444;
--color-info: #3B82F6;
```

## タイポグラフィ

### フォントファミリー
```css
--font-family-primary: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### フォントサイズ
| トークン | サイズ | 用途 |
|---------|--------|------|
| `--font-size-xs` | 12px | 小さなラベルやタグ |
| `--font-size-sm` | 14px | 補助テキスト |
| `--font-size-base` | 16px | 本文 |
| `--font-size-lg` | 18px | サブタイトル |
| `--font-size-xl` | 20px | 小見出し |
| `--font-size-2xl` | 24px | セクションタイトル |
| `--font-size-3xl` | 30px | 中見出し |
| `--font-size-4xl` | 36px | 大見出し |
| `--font-size-5xl` | 48px | ヒーロータイトル |

## スペーシング
一貫したスペーシングシステムを採用し、4pxを基本単位としています。

```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
```

## コンポーネント

### ボタン（Button）
基本的なボタンコンポーネント。4つのバリエーションを提供。

```html
<!-- プライマリボタン -->
<button class="btn btn-primary">ボタン</button>

<!-- セカンダリボタン -->
<button class="btn btn-secondary">ボタン</button>

<!-- アウトラインボタン -->
<button class="btn btn-outline">ボタン</button>

<!-- ゴーストボタン -->
<button class="btn btn-ghost">ボタン</button>
```

#### サイズバリエーション
```html
<button class="btn btn-primary btn-sm">小さいボタン</button>
<button class="btn btn-primary">通常ボタン</button>
<button class="btn btn-primary btn-lg">大きいボタン</button>
```

### カード（Card）
コンテンツを整理するためのカードコンポーネント。

```html
<div class="card">
    <h3 class="card-title">カードタイトル</h3>
    <div class="card-body">
        カードの内容がここに入ります。
    </div>
</div>
```

### フォーム要素
統一されたフォームスタイリング。

```html
<div class="form-group">
    <label class="form-label">ラベル</label>
    <input type="text" class="form-input" placeholder="プレースホルダー">
</div>

<div class="form-group">
    <label class="form-label">選択</label>
    <select class="form-input form-select">
        <option>オプション1</option>
        <option>オプション2</option>
    </select>
</div>
```

### バッジとタグ
ステータスやカテゴリを表示するための小さなコンポーネント。

```html
<!-- バッジ -->
<span class="badge badge-success">成功</span>
<span class="badge badge-warning">警告</span>
<span class="badge badge-error">エラー</span>
<span class="badge badge-info">情報</span>

<!-- タグ -->
<span class="tag">デフォルト</span>
<span class="tag tag-green">グリーン</span>
<span class="tag tag-navy">ネイビー</span>
```

### アコーディオン
折りたたみ可能なコンテンツセクション。

```html
<div class="accordion-item">
    <div class="accordion-header">
        <h3>質問</h3>
        <i class="fas fa-chevron-down accordion-icon"></i>
    </div>
    <div class="accordion-content">
        <p>回答内容</p>
    </div>
</div>
```

### タイムライン
配送状況などの時系列情報を表示。

```html
<div class="timeline">
    <div class="timeline-item active">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
            <div class="timeline-time">時刻</div>
            <div class="timeline-status">ステータス</div>
            <div class="timeline-location">場所</div>
        </div>
    </div>
</div>
```

## レイアウトシステム

### コンテナ
最大幅1440pxのレスポンシブコンテナ。

```css
.container {
    max-width: 1440px;
    padding-left: var(--spacing-6);
    padding-right: var(--spacing-6);
    margin-left: auto;
    margin-right: auto;
}
```

### グリッドシステム
CSS Gridを使用した柔軟なレイアウト。

```css
/* サービスグリッド */
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-6);
}

/* 2カラムレイアウト */
.two-column-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-8);
}
```

## アニメーション

### トランジション
3つの速度設定を用意。

```css
--transition-fast: 150ms ease-in-out;
--transition-base: 300ms ease-in-out;
--transition-slow: 500ms ease-in-out;
```

### スクロールアニメーション
- Intersection Observerを使用したフェードイン
- カウンターアニメーション（数値のカウントアップ）
- パララックス効果（ヒーロー画像）

## レスポンシブデザイン

### ブレークポイント
```css
--breakpoint-sm: 640px;   /* モバイル */
--breakpoint-md: 768px;   /* タブレット */
--breakpoint-lg: 1024px;  /* デスクトップ */
--breakpoint-xl: 1280px;  /* 大画面 */
```

### モバイル対応
- ハンバーガーメニュー
- 1カラムレイアウトへの自動変更
- タッチフレンドリーなインタラクション

## アクセシビリティ
- 適切なカラーコントラスト比の確保
- フォーカス状態の明確な表示
- スクリーンリーダー対応のマークアップ
- キーボードナビゲーション対応

## 実装上の注意点

### パフォーマンス
- CSS変数を使用した効率的なスタイリング
- アニメーションは`transform`と`opacity`を優先使用
- 画像の遅延読み込み対応

### メンテナンス性
- コンポーネントベースの設計
- BEM命名規則に準拠
- デザイントークンによる一元管理

## 使用方法

1. デザイントークンCSS（`design-tokens.css`）を読み込む
2. コンポーネントCSS（`components.css`）を読み込む
3. プロジェクト固有のスタイル（`style.css`）を読み込む
4. 必要に応じてJavaScript（`animations.js`）を読み込む

```html
<link rel="stylesheet" href="styles/design-tokens.css">
<link rel="stylesheet" href="styles/components.css">
<link rel="stylesheet" href="styles/style.css">
<script src="src/animations.js"></script>
```

## 今後の拡張予定
- ダークモード対応
- 追加のコンポーネント（モーダル、トースト通知など）
- Figmaとの連携強化
- Storybookの導入