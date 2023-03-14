import { ExtensionContext, ViewColumn, WebviewPanel, window } from "vscode";
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

let webviewPanel: WebviewPanel | undefined;

export function createWebViewDataLog(context: ExtensionContext) {
  if (webviewPanel === undefined) {
    webviewPanel = window.createWebviewPanel(
      "webView",
      "DataLog Tool",
      vscode.ViewColumn.One,
      {
        retainContextWhenHidden: true,
        enableScripts: true,
      }
    );
    const diskPath = path.join(
      context.extensionPath,
      "localFile",
      "index.html"
    );
    // const diskPath = path.join(context.extensionPath, 'out', 'build', 'index.html')
    webviewPanel.webview.html = getWebViewContent(diskPath);
    // webviewPanel.webview.postMessage({ text: '1223' })
    webviewPanel.reveal();
  } else {
    webviewPanel.reveal();
  }

  webviewPanel.onDidDispose(() => {
    webviewPanel = undefined;
  });

  webviewPanel.webview.onDidReceiveMessage((message) => {});

  return webviewPanel;
}

function getWebViewContent(src: string) {
  const dirPath = path.dirname(src);
  let html = fs.readFileSync(src, "utf-8");
  html = html.replace(
    /(<link.+?href="|<script.+?src="|<iframe.+?src="|<img.+?src=")(.+?)"/g,
    (m, $1, $2) => {
      if ($2.indexOf("https://") < 0) {
        return (
          $1 +
          vscode.Uri.file(path.resolve(dirPath, $2)).with({
            scheme: "vscode-resource",
          }) +
          '"'
        );
      } else {
        return $1 + $2 + '"';
      }
    }
  );
  return html;
}
