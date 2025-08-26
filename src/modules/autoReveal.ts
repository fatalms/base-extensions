import vscode from 'vscode';

async function isSearchVisible(): Promise<boolean> {
    return await vscode.commands.executeCommand('getContextKeyValue', 'searchViewletVisible') as boolean;
}

export const autoReveal = () => {
    vscode.window.onDidChangeActiveTextEditor(async (editor) => {
        const config = vscode.workspace.getConfiguration('quick-tools');
        const autoReveal = config.get('autoReveal', false);

        const searchVisible = await isSearchVisible();

        if (editor && autoReveal && searchVisible) {
            vscode.commands.executeCommand('workbench.files.action.showActiveFileInExplorer');
        }
    });

    return vscode.commands.registerCommand('quick-tools.autoReveal.forceReveal', () => {
        if (vscode.window.activeTextEditor) {
            vscode.commands.executeCommand('workbench.files.action.showActiveFileInExplorer');
        }
    });
};
