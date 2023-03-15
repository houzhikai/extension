import * as vscode from "vscode";
import { showContent } from "./tools/showContent";
import { showLocalContent } from "./tools/showLocalContent";
import { showReference } from "./tools/showReference";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("test-plugin.content", () =>
      showContent(context)
    ),
    // 引用https
    vscode.commands.registerCommand("test-plugin.reference", () =>
      showReference(context)
    ),
    vscode.commands.registerCommand("test-plugin.localFile", () =>
      showLocalContent(context)
    )
  );
}
// export function deactivate() {}
