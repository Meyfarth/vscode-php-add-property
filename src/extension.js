const vscode = require('vscode');
const AddProperty = require('./AddProperty');

function activate(context) {
    let addProperty = new AddProperty();

    if (vscode.window.activeTextEditor !== undefined) {
        setCursorIsOnPropertyLineContext(vscode.window.activeTextEditor);
    }

    context.subscriptions.push(
        vscode.commands.registerCommand('phpAddProperty.add', () => {
            if (vscode.window.activeTextEditor !== undefined) {
                addProperty.add();
            }
        }),
        vscode.commands.registerCommand('phpAddProperty.append', () => {
            if (vscode.window.activeTextEditor !== undefined) {
                addProperty.append();
            }
        }),
        vscode.window.onDidChangeTextEditorSelection((event) => {
            setCursorIsOnPropertyLineContext(event.textEditor);
        })
    );

    context.subscriptions.push(addProperty);
}

function setCursorIsOnPropertyLineContext(editor) {
    const addProperty = new AddProperty();

    const selectionLineNumber = editor.selection.active.line;
    const line = editor.document.lineAt(selectionLineNumber);
        
    vscode.commands.executeCommand('setContext', 'cursorIsOnPropertyLine', addProperty.isPropertyLine(line.text));
}

exports.activate = activate;