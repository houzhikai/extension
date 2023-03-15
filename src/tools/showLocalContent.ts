import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { WebviewPanel } from "vscode";

let panel: WebviewPanel | undefined;
export const showLocalContent = (context: vscode.ExtensionContext) => {
  if (panel !== undefined) {
    panel.reveal();
  } else {
    panel = vscode.window.createWebviewPanel(
      "loadLocalFile",
      "loadLocalFile",
      vscode.ViewColumn.One,
      {
        retainContextWhenHidden: true,
        enableScripts: true,
      }
    );
    const diskPath = path.join(
      context.extensionPath,
      "localFile",
      "datalog",
      "index.html"
    );
    panel.webview.html = getWebViewContent(diskPath);
  }

  return panel;
};

const getWebViewContent = (src: string) => {
  const dirPath = path.dirname(src);
  let html = fs.readFileSync(src, "utf-8");
  html = html.replace(
    /(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g,
    (m, $1, $2) => {
      // return (
      //   $1 +
      //   vscode.Uri.file(path.resolve(dirPath, $2))
      //     .with({ scheme: "vscode-resource" })
      //     .toString() +
      //   '"'
      // );
      const absLocalPath = path.resolve(dirPath, $2);
      const webviewUrl = panel?.webview.asWebviewUri(vscode.Uri.file(absLocalPath));
      const replaceHref = $1 + webviewUrl?.toString() + '""';
      return replaceHref;
    }
  );
  return html;
};
