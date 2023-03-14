import * as vscode from "vscode";
import { WebviewPanel } from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let panel: WebviewPanel | undefined;
  const showContent = () => {
    if (panel === undefined) {
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
    } else {
      panel.reveal(); // 调用reveal()或拖动一个web视图面板到一个新的编辑器列移动web视图到那个新列。
    }

    return panel;
  };
  context.subscriptions.push(
    vscode.commands.registerCommand("test-plugin.helloWorld", showContent),
    vscode.commands.registerCommand("test-plugin.helloWorld1", showContent)
  );
}
// export function deactivate() {}

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
