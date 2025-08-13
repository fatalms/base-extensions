import { execSync } from 'child_process';
import vscode from 'vscode';

export const openInWebstorm = () => {
    return vscode.commands.registerCommand('quick-tools.openInWebstorm', async () => {
        const editor = vscode.window.activeTextEditor;
        let inputPath: string;

        const config = vscode.workspace.getConfiguration('quick-tools.openInWebstorm');
        const command: string = config.get('command', 'webstorm');

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

        execSync(`${command} ${inputPath}`);
        vscode.window.showInformationMessage('openInWebstorm: ', inputPath);
    });
};
