import path from 'path';
import vscode from 'vscode';

export const findInFiles = () => {
    return vscode.commands.registerCommand('quick-tools.open', async () => {
        const config = vscode.workspace.getConfiguration('quick-tools');
        const excludePatterns: string[] = config.get('excludePatterns', []);

        // Объединяем паттерны в один через запятую
        const excludeGlob = excludePatterns.length > 0 ? `{${excludePatterns.join(',')}}` : '';

        // Ищем все файлы, исключая указанные паттерны
        const uris = await vscode.workspace.findFiles('**/*', excludeGlob || undefined);

        const items = uris.map(uri => {
            const fullPath = vscode.workspace.asRelativePath(uri);
            const fileName = path.basename(fullPath);
            const folderPath = path.dirname(fullPath);

            return ({
                label: fileName,
                description: fullPath,
                uri,
            });
        });

        const pick = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select a file (with exclude patterns applied)',
            matchOnDescription: true,
            matchOnDetail: false,
        });

        if (pick) {
            vscode.window.showTextDocument(pick.uri);
        }
    });
};
