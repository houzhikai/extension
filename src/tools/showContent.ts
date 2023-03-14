import * as vscode from "vscode";
import { WebviewPanel } from "vscode";

let panel: WebviewPanel | undefined;
export const showContent = (context: vscode.ExtensionContext) => {
  if (panel !== undefined) {
    panel.reveal();
  } else {
    panel = vscode.window.createWebviewPanel(
      "firstTool", //标识webview的类型。在内部使用
      "firstTool", //显示给用户的面板标题
      vscode.ViewColumn.One, //编辑器列中显示新的webview面板
      {
        retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
        enableScripts: true, // 启用JS，默认禁用
      }
    );
    // add content
    panel.webview.html = getWebviewContent();
    // 当前面板关闭时复位,用于在视图关闭时调用
    panel.onDidDispose(
      () => {
        panel = undefined;
      },
      null,
      context.subscriptions
    );
  }

  return panel;
};

const getWebviewContent = () => {
  return `<!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Cat Coding</title>
              </head>
              <script>
                console.log(454566115)
              </script>
              <body>
                  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
              </body>
              </html>
           `;
};
