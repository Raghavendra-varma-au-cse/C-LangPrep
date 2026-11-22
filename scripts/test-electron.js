const { spawn } = require('child_process');
const electronPath = require('electron');

const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;

const child = spawn(electronPath, ['-v'], { env });
child.stdout.on('data', d => console.log('VERSION:', d.toString()));
child.stderr.on('data', d => console.log('STDERR:', d.toString()));
child.on('close', code => console.log('Closed with code:', code));
