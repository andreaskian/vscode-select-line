'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-select-line" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.selectLine', () => {
        // The code you place here will be executed every time your command is executed
          let editor = vscode.window.activeTextEditor;
          
          if (!editor) { return; };
          
          let doc = editor.document
          let sel = editor.selections
          
          editor.selections = sel.map(s => {
              
                let {line, character} = s.active;
                
                const numberOfCharactersOnFirstLine = doc.lineAt(s.start.line).range.end.character;
                
                if (numberOfCharactersOnFirstLine > 0) {                    
                    return new vscode.Selection(
                        new vscode.Position(line, 0),
                        new vscode.Position(line, numberOfCharactersOnFirstLine)
                    );
                };
                
                return s;
            })
        
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
