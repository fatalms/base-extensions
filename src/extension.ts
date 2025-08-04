import vscode from 'vscode';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import open from 'open';

export function activate(context: any) {
  const disposable = vscode.commands.registerCommand('open-in-bitbucket.openCurrentFile', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('❗ No file selected.');
      return;
    }

    const inputPath = editor.document.uri.fsPath;
    const lineNumber = editor.selection.active.line + 1;

    try {
      const dir = path.dirname(inputPath);
      const target = path.resolve(dir, inputPath);

      const exec = (c: string) => execSync(c, { cwd: path.dirname(inputPath) });

      const gitRoot = exec('git rev-parse --show-toplevel').toString().trim();

      if (!fs.existsSync(target)) {
        vscode.window.showErrorMessage(`❌ File not found: ${target}`);
        return;
      }

      const fileRelativeToRepo = path.relative(gitRoot, target).replace(/\\/g, '/');

      const branch = exec('git rev-parse --abbrev-ref HEAD').toString().trim();

      const remoteUrl = exec('git config --get remote.origin.url').toString().trim();
      const match = remoteUrl.match(/ssh:\/\/git@([^:]+):\d+\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)\.git$/);

      if (!match) {
        vscode.window.showErrorMessage('❌ Could not parse git remote URL');
        return;
      }

      const host = match[1];
      const project = match[2].toUpperCase();
      const repo = match[3];

      const baseUrl = `https://${host}/projects/${project}/repos/${repo}/browse/${fileRelativeToRepo}`;
      const query = `?at=refs/heads/${branch}`;
      const anchor = lineNumber ? `#${lineNumber}` : '';
      const url = `${baseUrl}${query}${anchor}`;

      vscode.window.setStatusBarMessage(`🔗 Opening in Bitbucket...`, 1500);
      await open(url);
    } catch (err: any) {
      vscode.window.showErrorMessage(`❌ Error: ${err.message}`, path.dirname(inputPath), 'asdasd');
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
