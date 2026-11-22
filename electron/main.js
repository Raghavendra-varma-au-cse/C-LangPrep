const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');

let mainWindow = null;
let server = null;
let port = 3456;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

function startStaticServer(callback) {
  const outDir = path.join(__dirname, '..', 'out');

  server = http.createServer((req, res) => {
    let reqUrl = req.url || '/';
    // Strip query parameters
    reqUrl = reqUrl.split('?')[0];

    // Strip basePath if present (e.g. /C-LangPrep/)
    if (reqUrl.startsWith('/C-LangPrep')) {
      reqUrl = reqUrl.slice('/C-LangPrep'.length);
      if (!reqUrl) reqUrl = '/';
    }

    let filePath = path.join(outDir, reqUrl);

    // If path is a directory or root, point to index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    // If file doesn't exist, try appending .html
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }

    // SPA fallback: if still not found, serve out/index.html
    if (!fs.existsSync(filePath)) {
      filePath = path.join(outDir, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading ' + reqUrl);
      } else {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(content);
      }
    });
  });

  server.listen(0, '127.0.0.1', () => {
    port = server.address().port;
    callback(port);
  });
}

function createWindow(localPort) {
  const isDev = process.env.NODE_ENV === 'development';

  mainWindow = new BrowserWindow({
    width: 1360,
    height: 880,
    minWidth: 960,
    minHeight: 640,
    title: 'The Complete C Engineering Academy',
    icon: path.join(__dirname, '..', 'build', process.platform === 'win32' ? 'icon.ico' : 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#fffdf9',
    autoHideMenuBar: true
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `http://127.0.0.1:${localPort}`;

  mainWindow.loadURL(startUrl);

  // Open external links in user's default system browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App lifecycle
app.whenReady().then(() => {
  if (process.platform === 'win32') {
    app.setAppUserModelId('com.cacademy.app');
  }

  if (process.env.NODE_ENV === 'development') {
    createWindow(3000);
  } else {
    startStaticServer((assignedPort) => {
      createWindow(assignedPort);
    });
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      if (process.env.NODE_ENV === 'development') {
        createWindow(3000);
      } else {
        createWindow(port);
      }
    }
  });
});

app.on('window-all-closed', () => {
  if (server) {
    server.close();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
