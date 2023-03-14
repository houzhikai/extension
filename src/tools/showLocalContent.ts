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
    // const diskPath = path.join(
    //   context.extensionPath,
    //   "test",
    //   "index.html"
    // );
    panel.webview.html = getWebViewContent(diskPath); // getIframeHtml("192.168.3.10/#/home"); //
  }
  return panel;
};

// const getWebViewContent = (src: string) => {
//   const dirPath = path.dirname(src);
//   let html = fs.readFileSync(src, "utf-8");
//   console.log(111, dirPath, 222, src);
//   html = html.replace(
//     /(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g,
//     (m, $1, $2) => {
//       return (
//         $1 +
//         vscode.Uri.file(path.resolve(dirPath, $2))
//           .with({ scheme: "vscode-resource" })
//           .toString() +
//         '"'
//       );
//     }
//   );
//   return html;
// };

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

function getIframeHtml(url: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            html,
            body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100%;
                height: 100%;
            }
            .iframeDiv {
                width: 100%;
                height: 100%;
            }
        </style>
        </head>

        <body>
            <iframe id='iframe1' class="iframeDiv" src="http://${url}" scrolling="auto"></iframe>
        </body>
    </html>
    `;
}
