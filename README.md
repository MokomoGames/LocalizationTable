# ローカライズゲーム開発用GAS

**このドキュメントは記述が不足しています**

## 使い方

1. 既定の名前に命名されたシートに必要な情報を記述する
![image](https://user-images.githubusercontent.com/15795655/132096253-e08b302e-fd1e-4e38-9ea8-1b61663c822d.png)

2. 何かしらの方法で"method_name"と"config"を含めた通信をGASと行う

## 環境

- PlayFab
- TypeScript
- Fastlane

## API一覧

### updateStringTableAll

アプリ内で使用される全言語の文言テーブルをPlayFabにアップロードする

### outputIOSResources

iOSストア情報を書き出し

### outputAndroidResources

Androidストア情報を書き出し

### outputCharacterListForUnity

Unity内で使用する文字群が一覧されたファイルを描きだす
