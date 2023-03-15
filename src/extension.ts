import * as vscode from "vscode";
import { showContent } from "./tools/showContent";
import { showLocalContent } from "./tools/showLocalContent";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("test-plugin.helloWorld", () =>
      showContent(context)
    ),
    vscode.commands.registerCommand("test-plugin.localFile", () =>
      showLocalContent(context)
    )
  );
}
// export function deactivate() {}
