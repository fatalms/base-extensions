import path from 'path';
import vscode from 'vscode';

export const findFiles = () => {
    return vscode.commands.registerCommand('quick-tools.findFiles', async () => {
        const config = vscode.workspace.getConfiguration('quick-tools.findFiles');
        const excludePatterns: string[] = config.get('excludePatterns', []);

        // Объединяем паттерны в один через запятую
        const excludeGlob = excludePatterns.length > 0 ? `{${excludePatterns.join(',')}}` : '';

        // Ищем все файлы, исключая указанные паттерны
        const uris = await vscode.workspace.findFiles('**/*', excludeGlob || undefined);

        const items = uris.map(uri => {
            const fullPath = vscode.workspace.asRelativePath(uri);
            const fileName = path.basename(fullPath);
            const dirName = path.basename(path.dirname(fullPath));
            const label = fileName.includes('index') ? `${dirName}/${fileName}` : fileName;

            return ({
                label,
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
