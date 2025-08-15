import path from 'path';
import vscode from 'vscode';

export const findFiles = (context: vscode.ExtensionContext) => {
    return vscode.commands.registerCommand('quick-tools.findFiles', async () => {
        const config = vscode.workspace.getConfiguration('quick-tools.findFiles');
        const excludePatterns: string[] = config.get('excludePatterns', []);

        const excludeGlob = excludePatterns.length > 0 ? `{${excludePatterns.join(',')}}` : '';
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

        // достаём сохранённое значение (или пустое)
        const lastSearch = context.globalState.get<string>('quickTools.lastSearch', '');

        // создаём QuickPick вручную
        const qp = vscode.window.createQuickPick<typeof items[0]>();

        qp.items = items;
        qp.matchOnDescription = true;
        qp.value = lastSearch;
        qp.placeholder = 'Select a file (with exclude patterns applied)';

        qp.onDidAccept(() => {
            const selection = qp.selectedItems[0];

            if (selection) {
                vscode.window.showTextDocument(selection.uri);
            }
            context.globalState.update('quickTools.lastSearch', qp.value); // сохраняем введённый текст
            qp.hide();
        });

        qp.onDidHide(() => {
            // даже если не выбрали — сохраняем текст
            context.globalState.update('quickTools.lastSearch', qp.value);
            qp.dispose();
        });

        qp.show();
    });
};
