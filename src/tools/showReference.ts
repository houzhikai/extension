import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { WebviewPanel } from "vscode";

let panel: WebviewPanel | undefined;
export const showReference = (context: vscode.ExtensionContext) => {
  if (panel !== undefined) {
    panel.reveal();
  } else {
    panel = vscode.window.createWebviewPanel(
      "reference", //标识webview的类型。在内部使用
      "reference", //显示给用户的面板标题
      vscode.ViewColumn.One, //编辑器列中显示新的webview面板
      {
        retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
        enableScripts: true, // 启用JS，默认禁用
      }
    );
    const diskPath = path.join(
      context.extensionPath,
      "localFile",
      "reference",
      "index.html"
    );
  //   getExtensionFileVscodeResource: function(context, relativePath) {
  //     const diskPath = vscode.Uri.file(path.join(context.extensionPath, relativePath));
  //     return diskPath.with({ scheme: 'vscode-resource' }).toString();
  // }
  
    // add content
    panel.webview.html = getWebviewContent(diskPath);
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

function getWebviewContent(src: string) {
  const resourcePath = path.join(src);
  const dirPath = path.dirname(resourcePath);
  let html = fs.readFileSync(resourcePath, "utf-8");
  html = html.replace(
    /(<link.+?href="|<script.+?src="|<iframe.+?src="|<img.+?src=")(.+?)"/g,
    (m, $1, $2) => {
      // if ($2.indexOf("https://") < 0) {
      //   return (
      //     $1 +
      //     vscode.Uri.file(path.resolve(dirPath, $2))
      //       .with({ scheme: "vscode-resource" })
      //       .toString() +
      //     '"'
      //   );
      // } else {
      //   return $1 + $2 + '"';
      // }
      const absLocalPath = path.resolve(dirPath, $2);
      const webviewUrl = panel?.webview.asWebviewUri(vscode.Uri.file(absLocalPath));
      const replaceHref = $1 + webviewUrl?.toString() + '""';
      return replaceHref;
    }
  );
  return html;
}
