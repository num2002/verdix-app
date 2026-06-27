import { Client } from 'ssh2';
import fs from 'fs';
import path from 'path';

const config = {
  host: '103.80.48.28',
  port: 22,
  username: 'verdixgr',
  password: 'Suksena@2520',
  readyTimeout: 20000,
};

const LOCAL_DIST = 'c:/Projects/virdixgreen/dist';

function getAllFiles(dir, base = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...getAllFiles(full, base));
    } else {
      files.push({ local: full, remote: full.replace(base, '').replace(/\\/g, '/') });
    }
  }
  return files;
}

async function runShell(conn, cmd) {
  return new Promise((resolve, reject) => {
    conn.shell({ term: 'vt100' }, (err, stream) => {
      if (err) return reject(err);
      let output = '';
      const sentinel = '__DONE__';
      stream.on('data', d => {
        output += d.toString();
        if (output.includes(sentinel)) {
          stream.end();
        }
      });
      stream.on('close', () => resolve(output));
      stream.write(`${cmd}\necho "${sentinel}"\n`);
    });
  });
}

async function uploadViaShell(conn, localPath, remotePath) {
  return new Promise((resolve, reject) => {
    conn.shell({ term: 'vt100' }, (err, stream) => {
      if (err) return reject(err);
      const content = fs.readFileSync(localPath);
      const b64 = content.toString('base64');
      let output = '';
      const sentinel = 'UPLOAD_OK_' + Date.now();
      stream.on('data', d => {
        output += d.toString();
        if (output.includes(sentinel)) { stream.end(); }
      });
      stream.on('close', () => {
        if (output.includes(sentinel)) resolve();
        else reject(new Error('Upload sentinel not found'));
      });
      const dir = path.posix.dirname(remotePath);
      stream.write(`mkdir -p "${dir}" && printf '%s' '${b64}' | base64 -d > "${remotePath}" && echo "${sentinel}"\n`);
    });
  });
}

async function deploy() {
  // First: test shell and find web root
  const conn1 = new Client();
  await new Promise((res, rej) => { conn1.on('ready', res); conn1.on('error', rej); conn1.connect(config); });
  console.log('SSH connected! Testing shell...');

  const shellOut = await runShell(conn1, 'echo HELLO && pwd && ls -la && ls httpdocs/ 2>/dev/null');
  console.log('Shell output:\n', shellOut.substring(0, 500));
  conn1.end();
}

deploy().catch(e => { console.error('Error:', e.message); process.exit(1); });
