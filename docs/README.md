# qbn-manager

## プロジェクト概要

Qubena ManagerはXXX向けのWebアプリケーション

## 技術スタック

### コア技術

- **フレームワーク**: React
- **言語**: TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **ルーティング**: TanStack Router
- **状態管理**: TanStack Query
- **フォーム管理**: React Hook Form + Zod
- **テスト**: Vitest + Storybook Test
- **コンポーネントライブラリ**: shadcn/ui (Radix UI)

### 選定理由

**フレームワーク・ルーティング**

いただいたデザインからアプリケーション構成としては、ログイン前提の管理画面系のアプリケーションと思ったのでSSRは考えず、またNext.jsのようなフルスタックなフレームワークは機能過多となるかなと考えた。React Routerに馴染みがあったが、よりルーティングに特化したTanStack Routerで型安全なルーティングを行い、保守性を高められる形とした。

**状態管理**

TanStack QueryはServer State管理に特化し、キャッシュと再取得ロジックを簡素化できる。責務別にライブラリを使い分けるアプローチも主流になっていて、Reduxのような全てを管理するようなライブラリは複雑性もあり不要かなと考えた。必要に応じてJotaiで小さな単位での状態管理を追加で導入すれば事足りると判断した。

**スタイリング**

Tailwind CSSはユーティリティクラスの利用で開発速度を高められる点と作り込む際にはfigmaなどで定義されたデザイントークンのインポートもしやすく変化に追従しやすいことから保守性も高められると考えた。shadcn/uiは導入・カスタマイズ・廃止のしやすさが利点で導入したが、習熟度が高くなかったためカスタマイズの学習コストが高く感じ、単純なUIや作り込む時間があるのであればheadlessコンポーネントのみの方が理解のしやすい構成にできた可能性も感じた。

**テスト・開発環境**

Storybookでのコンポーネント駆動開発は、ドキュメンテーションにもなりChromaticなどでホスティングもすれば、デザインチームや必要に応じて開発職以外にも円滑なコミュニケーションに活用できる。また今回アプリケーション側には導入していないがMSWも組み合わせることでテストの充実やAPI定義のみ決まっていればAPIが完成していなくてもフロントエンド開発を進められる利点があり、品質と開発速度の両立に貢献できると考えた。

### 開発ツール

- **リンター**: ESLint
- **スペルチェッカー**: CSpell
- **モック**: MSW
- **UI開発環境**: Storybook

## ディレクトリ構成

```ja
qbn-manager/
├── .storybook/        # Storybook設定
├── docs/              # プロジェクトドキュメント
├── node_modules/      # 依存パッケージ
├── public/            # 静的アセット
├── src/               # ソースコード
│   ├── assets/        # 画像など静的リソース
│   ├── components/    # Reactコンポーネント
│   │   ├── app/       # アプリケーション固有コンポーネント
│   │   └── ui/        # 汎用UIコンポーネント
│   ├── lib/           # 外部ライブラリを使用したユーティリティ関数
│   ├── models/        # データモデル型定義
│   ├── mocks/         # モックデータ管理
│   ├── routes/        # ルート構成とページコンポーネント
│   │   └── _private/  # 認証が必要なルート
│   ├── services/      # APIサービス
│   └── utils/         # ユーティリティ関数
├── themes/            # テーマ設定
├── .tool-versions     # asdf設定ファイル
├── eslint.config.js   # ESLint設定
├── cspell.json        # CSpell設定
├── index.html         # エントリポイントHTML
├── Makefile           # 開発コマンド集
├── package.json       # 依存関係
├── tsconfig.json      # TypeScript設定
├── vite.config.ts     # Vite設定
└── vitest.workspace.ts # Vitest設定
```

## セットアップ手順

### 前提条件

- Node.js (22.13.0)

完全に一致していなくても動く可能性はありますが、動かない場合は合わせて見てください。

### インストール

```bash
# asdf, makeが動く環境であればこちらでNode.jsのインストールもできます
make install

# または直接npmを使用する場合
npm install
```

## 利用可能なコマンド

### 開発

```bash
# 開発サーバー起動
make dev
# または
npm run dev

# Storybook起動
make dev-storybook
# または
npm run storybook
```

※ 今回のプロジェクトでは開発サーバー起動後に http://localhost:5173/facilitators を開いてください

### リンティングとタイプチェック

```bash
# リント、タイプチェック、スペルチェック実行
make lint
# または
npm run lint
npm run typecheck
npm run cspell

# 自動修正可能な問題を修正
make fix
# または
npm run fix
```

### テスト

```bash
# テスト実行
make test
# または
npm run test

# ウォッチモードでテスト
make test-watch
# または
npm run test:watch
```

### ビルド

```bash
# 本番用ビルド
make build
# または
npm run build

# ビルド結果のプレビュー
make preview
# または
npm run preview
```

## 開発ガイドライン

### コンポーネント設計

- コンポーネントはStorybook内でドキュメント化してください
- UIコンポーネントは`components/ui`に、アプリケーション固有コンポーネントは`components/app`に配置してください

### ルーティング

- TanStack Routerを使用したルーティングを実装しています
- プライベートルートは`routes/_private`に配置してください
- ルート定義は自動生成されます（`routeTree.gen.ts`）

### APIとの連携

- TanStack Queryを使用してAPIリクエストを管理してください
- 開発時にはMSW（Mock Service Worker）を使用してモックAPIを提供します

### テーマとスタイリング

- Tailwind CSSを使用してスタイリングしてください
- テーマ変数は`themes`ディレクトリで定義してください

## 仕様に関する補足

> ● 非同期処理実行時はローダーを画面中央に表示してください。

上記の仕様は正しく満たせていないです。
ローディングを別で表示せずにスケルトンUIでローディング中は表現できていて、
ページネーションと合わせるとレイアウトシフトも起きづらいかもと考えこの手法としています。
