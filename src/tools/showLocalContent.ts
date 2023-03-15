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
      "index.html"
    );
    panel.webview.html = getWebViewContent(diskPath); // getIframeHtml("192.168.3.10/#/home"); //
  }
  return panel;
};

const getWebViewContent = (src: string) => {
  const dirPath = path.dirname(src);
  let html = fs.readFileSync(src, "utf-8");
  html = html.replace(
    /(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g,
    (m, $1, $2) => {
      return (
        $1 +
        vscode.Uri.file(path.resolve(dirPath, $2))
          .with({ scheme: "vscode-resource" })
          .toString() +
        '"'
      );
    }
  );
  return html;
};
