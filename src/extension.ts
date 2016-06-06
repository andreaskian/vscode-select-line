'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.selectLine', () => {

    let editor = vscode.window.activeTextEditor;
    if ( !editor ) {
      return;
    };

    let {document, selections} = editor;

    editor.selections = selections.map(s => {

      // active.line is zero based while document.lineCount aren't
      // therefore s.active.line is increased by one here
      let currentLine = s.active.line + 1;
      let selectionFirst = new vscode.Position(s.start.line, 0);

      // expand selection to current line forward
      if (document.lineCount > currentLine) {
        let selectionForward = new vscode.Position(currentLine, 0);
        return new vscode.Selection(selectionFirst, selectionForward);
      }

      // default expand selection to current line
      let selectionCurrentLine = new vscode.Position(s.active.line, document.lineAt(s.active.line).range.end.character);
      return new vscode.Selection(selectionFirst, selectionCurrentLine);
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  // nothing here ...
}