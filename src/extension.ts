import { findInFiles } from './modules/findInFiles';
import { openCurrentFileInGit } from './modules/openCurrentFileInGit';
import { openInWebstorm } from './modules/openInWebstorm';
import vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        openInWebstorm(),
        openCurrentFileInGit(),
        findInFiles()
    );
}

export function deactivate() {}
