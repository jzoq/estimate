/*
    server.js: サーバ起動ファイル
*/

// server/server.js
require('dotenv').config({ path: __dirname + '/../.env' }); //.envを読み込むためのdotenvモジュールを読み込む

const app = require('./app'); //expressサーバの設定ファイルを読み込む

//listenでこのserver.jsがずっとリクエストを待機する)
app.listen(process.env.PORT, ()=>{
    console.log(`サーバ起動: http://localhost:${process.env.PORT}`);
});