import vscode from 'vscode';

export const autoReveal = () => {
    vscode.window.onDidChangeActiveTextEditor((editor) => {
        const config = vscode.workspace.getConfiguration('quick-tools');
        const autoReveal = config.get('autoReveal', false);

        if (editor && autoReveal) {
            vscode.commands.executeCommand('workbench.files.action.showActiveFileInExplorer');
        }
    });

    return vscode.commands.registerCommand('quick-tools.autoReveal.forceReveal', () => {
        if (vscode.window.activeTextEditor) {
            vscode.commands.executeCommand('workbench.files.action.showActiveFileInExplorer');
        }
    });
};
