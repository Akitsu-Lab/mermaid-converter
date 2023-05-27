// CommonJS のモジュール構文で 2 つの Electron モジュールをインポート
// app、アプリケーションのイベントライフサイクルを制御
// BrowserWindow、アプリのウインドウを作成し管理します。
const { app, BrowserWindow, ipcMain } = require("electron");
const mermaid = require("mermaid/dist/mermaid.js");
// 下記だとエラーになる
// const mermaid = require("mermaid");

// ウェブページを新しい BrowserWindow インスタンスで読み込みます
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    // width: 800,
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");
};

// アプリの準備ができたら関数を呼び出す
// 開いたウインドウがない場合にウインドウを開く (macOS)
app.whenReady().then(() => {
  createWindow();

  ipcMain.on("convert", (event, mermaidCode) => {
    try {
      const svg = mermaid.render("graph", mermaidCode);
      event.sender.send("converted", svg);
    } catch (error) {
      event.sender.send("converted", `<p>Error: ${error.message}</p>`);
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 全ウインドウを閉じた時にアプリを終了する (Windows & Linux)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
