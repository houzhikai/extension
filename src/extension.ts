import * as vscode from "vscode";
import { showContent } from "./components/showContent";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("test-plugin.helloWorld", showContent)
  );
}
// export function deactivate() {}
