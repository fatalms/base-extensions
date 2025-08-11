import { openCurrentFile } from './modules/openCurrentFile';
import { openInWebstorm } from './modules/openInWebstorm';
import vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        openInWebstorm(),
        openCurrentFile()
    );
}

export function deactivate() {}
