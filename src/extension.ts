import { autoReveal } from './modules/autoReveal';
import { findFiles } from './modules/findFiles';
import { openCurrentFileInGit } from './modules/openCurrentFileInGit';
import { openInWebstorm } from './modules/openInWebstorm';
import vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        openInWebstorm(),
        openCurrentFileInGit(),
        findFiles(context),
        autoReveal()
    );
}

export function deactivate() {}
