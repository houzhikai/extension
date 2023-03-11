import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "test-plugin.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello");
    }
  );

  context.subscriptions.push(disposable);
}
export function deactivate() {}
