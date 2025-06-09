/*
    serverを建てるために必要なモジュールの読み込む設定ファイル
 */
const express = require('express'); //Node.jsのサーバ用フレームワーク
const cors = require('cors'); //別ポートからのリクエストを受けれるようにする
const connectDB = require('./config/db'); //サーバからデータベースに繋げるためのファイル
const deviceRoutes = require('./routes/devices'); //デバイス用のルート定義ファイル

const app = express(); //Expressフレームワークのインスタンス化

connectDB(); //データベース接続

//ミドルウェア登録
app.use(cors());
app.use(express.json()); //
app.use(express.static('public')); //公開用フォルダをpublicフォルダに設定

app.use('/api/devices', deviceRoutes); //デバイス用ルートのURLを/api/devicesに設定

module.exports = app; //Expressインスタンスをエクスポート(他のファイルで利用可能にする)