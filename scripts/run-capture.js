const { spawn } = require('child_process');
const electronPath = require('electron');
const path = require('path');

const env = { ...process.env, SCREENSHOT_MODE: '1', NODE_ENV: 'development' };
delete env.ELECTRON_RUN_AS_NODE;

console.log('Launching Electron to capture live screenshots...');
const child = spawn(electronPath, ['.'], {
  env,
  stdio: 'inherit'
});

child.on('close', (code) => {
  console.log(`Screenshot capture process exited with code ${code}`);
  process.exit(code);
});
