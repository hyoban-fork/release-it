import fs from 'fs';
import os from 'os';
import path from 'path';
import sh from 'shelljs';

const mkTmpDir = () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'release-it-'));
  return dir;
};

const readFile = file => fs.promises.readFile(path.resolve(file), 'utf8');

const gitAdd = (content, file, message) => {
  sh.ShellString(content).toEnd(file);
  sh.exec(`git add ${file}`);
  const { stdout } = sh.exec(`git commit -m "${message}"`);
  const match = stdout.match(/\[.+([a-z0-9]{7})\]/);
  return match ? match[1] : null;
};

const getArgs = (args, prefix) =>
  args.filter(args => typeof args[0] === 'string' && args[0].startsWith(prefix)).map(args => args[0].trim());

export { mkTmpDir, readFile, gitAdd, getArgs };
