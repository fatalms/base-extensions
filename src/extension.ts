import { findInFiles } from './modules/findInFiles';
import { openCurrentFile } from './modules/openCurrentFile';
import { openInWebstorm } from './modules/openInWebstorm';
import vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        openInWebstorm(),
        openCurrentFile(),
        findInFiles()
    );
}

export function deactivate() {}
