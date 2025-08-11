import { execSync } from 'child_process';
import vscode from 'vscode';

export const openInWebstorm = () => {
    return vscode.commands.registerCommand('open-in-bitbucket.openInWebstorm', async () => {
        const editor = vscode.window.activeTextEditor;
        let inputPath: string;

        // Если открыт редактор — берём путь файла и строку
        if (editor && editor.document.uri.scheme === 'file') {
            inputPath = editor.document.uri.fsPath;
        } else {
            // Если файл не выбран — берём путь первой активной папки
            const workspaceFolders = vscode.workspace.workspaceFolders;

            if (!workspaceFolders || workspaceFolders.length === 0) {
                vscode.window.showErrorMessage('❌ No file or workspace folder selected.');

                return;
            }
            inputPath = workspaceFolders[0].uri.fsPath;
        }

        execSync(`webstorm1 ${inputPath}`);
        vscode.window.showInformationMessage(inputPath);
    });
};
