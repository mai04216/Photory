# Photory Python Learning App

Java/Spring Boot経験者がPythonの基礎文法から実務レベルまで段階的に学べるWebアプリです。

## セットアップ

```bash
cd python-learning-app
npm install
npm run dev
```

## アイコンの準備

このアプリでは [icooon-mono](https://icooon-mono.com/) のSVGアイコンを使用します。
以下のアイコンをダウンロードし `public/icons/` に配置してください。

| ファイル名 | 検索キーワード | 用途 |
|-----------|-------------|------|
| home.svg | 家、ホーム | ホーム/トップ |
| book.svg | 本、ブック | レッスン |
| pencil.svg | 鉛筆、ペン | 問題 |
| check.svg | チェック、完了 | 完了マーク |
| lightbulb.svg | 電球、ライト | ヒント |
| lock.svg | 鍵、ロック | 未開放 |
| code.svg | コード、プログラム | コード |
| network.svg | 通信、ネットワーク | API/通信 |
| file.svg | ファイル、ドキュメント | ファイル |
| gear.svg | 歯車、設定 | 設定 |
| flower.svg | 花、フラワー | 達成 |
| coffee.svg | コーヒー | 休憩 |
| star.svg | 星、スター | お気に入り |
| arrow-right.svg | 矢印、右 | 次へ |
| clock.svg | 時計 | 学習時間 |

- SVG形式でダウンロード
- カラーは `#E8927C`（コーラルピンク）に統一
- アイコンがなくてもフォールバック絵文字で動作します

## デプロイ（GitHub Pages）

```bash
npm run deploy
```

## 技術スタック

- React + TypeScript (Vite)
- react-router-dom
- react-syntax-highlighter
- localStorage (進捗管理)
