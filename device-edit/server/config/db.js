const mongoose = require('mongoose');

// async(非同期関数)の作成
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ mongoDB Atlasに接続成功");
  } catch (error) {
    console.error("❌ mongoDB Atlasに接続失敗");
    console.error("エラー内容:", error.message);  // ← エラーの概要
    console.error("スタックトレース:", error.stack); // ← 詳細なトレース（任意）
    process.exit(1); // 強制終了
  }
};

module.exports = connectDB;