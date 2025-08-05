import vscode from 'vscode';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import open from 'open';

export function activate(context: any) {
  const disposable = vscode.commands.registerCommand('open-in-bitbucket.openCurrentFile', async () => {
    const editor = vscode.window.activeTextEditor;
    let inputPath: string;
    let inputDir: string;
    let lineNumber: number | undefined;

    // Если открыт редактор — берём путь файла и строку
    if (editor && editor.document.uri.scheme === 'file') {
      inputPath = editor.document.uri.fsPath;
      lineNumber = editor.selection.active.line + 1;
      inputDir = path.dirname(inputPath);
    } else {
      // Если файл не выбран — берём путь первой активной папки
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('❌ No file or workspace folder selected.');
        return;
      }
      inputPath = inputDir = workspaceFolders[0].uri.fsPath;
    }

    vscode.window.showInformationMessage(inputPath);

    try {
      const dir = path.dirname(inputPath);
      const target = path.resolve(dir, inputPath);

      const exec = (c: string) => execSync(c, { cwd: inputDir });

      const gitRoot = exec('git rev-parse --show-toplevel').toString().trim();

      if (!fs.existsSync(target)) {
        vscode.window.showErrorMessage(`❌ File not found: ${target}`);
        return;
      }

      const fileRelativeToRepo = path.relative(gitRoot, target).replace(/\\/g, '/');

      const branch = exec('git rev-parse --abbrev-ref HEAD').toString().trim();

      const remoteUrl = exec('git config --get remote.origin.url').toString().trim();
      const match = remoteUrl.match(/git@([^:]+):(?:\d+\/)?([\w\d_-]+)\/([\w\d_-]+)\.git$/);

      if (!match) {
        vscode.window.showErrorMessage('❌ Could not parse git remote URL');
        return;
      }

      const host = match[1];
      const project = match[2];
      const repo = match[3];

      let url: string = '';

      console.log('remoteUrl', remoteUrl);

      vscode.window.showInformationMessage('2232', remoteUrl);

      // bitbucket
      if (remoteUrl.includes("stash")) {
        const baseUrl = `https://${host}/projects/${project.toUpperCase()}/repos/${repo}/browse/${fileRelativeToRepo}`;
        const query = `?at=refs/heads/${branch}`;
        const anchor = lineNumber ? `#${lineNumber}` : '';
        url = `${baseUrl}${query}${anchor}`;
      // github
      } else {
        const baseUrl = `https://${host}/${project}/${repo}/tree/${branch}/${fileRelativeToRepo}`;
        const anchor = lineNumber ? `#L${lineNumber}` : '';
        url = `${baseUrl}${anchor}`;
      }

      vscode.window.setStatusBarMessage(`🔗 Opening in Bitbucket...`, 1500);
      await open(url);
    } catch (err: any) {
      vscode.window.showErrorMessage(`❌ Error: ${err.message}`, path.dirname(inputPath), 'asdasd');
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
