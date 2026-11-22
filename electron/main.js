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

async function captureAllScreenshots() {
  const screenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  const win = new BrowserWindow({
    width: 1440,
    height: 920,
    show: false,
    webPreferences: {
      offscreen: true
    }
  });

  console.log('Loading app for desktop screenshots...');
  await win.loadURL('http://localhost:3000');
  await new Promise(r => setTimeout(r, 3500));

  const captureTab = async (tabName, filename) => {
    await win.webContents.executeJavaScript(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('header button, nav button, div button'));
        const target = buttons.find(b => b.innerText && b.innerText.includes('${tabName}'));
        if (target) target.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 2000));
    const img = await win.webContents.capturePage();
    fs.writeFileSync(path.join(screenshotsDir, filename), img.toPNG());
    console.log('Saved: ' + filename);
  };

  await captureTab('150-Level Journey', '01-hero-curriculum-150.png');
  await captureTab('Error Doctor Lab', '02-c-error-doctor-lab.png');
  await captureTab('Visual Block Builder', '03-visual-block-studio.png');
  await captureTab('Systems', '04-systems-engineering-lab.png');
  await captureTab('Live C Compiler', '05-live-compiler-telemetry.png');
  await captureTab('32 Keywords', '06-keywords-encyclopedia.png');
  await captureTab('Everyday Machines', '07-everyday-machines.png');
  await captureTab('Global Resources', '08-global-c-resources.png');

  // Mobile Viewport (412x915 - Android & iPhone)
  win.setSize(412, 915);
  await new Promise(r => setTimeout(r, 2000));
  const mobileImg = await win.webContents.capturePage();
  fs.writeFileSync(path.join(screenshotsDir, '09-mobile-responsive-android-ios.png'), mobileImg.toPNG());
  console.log('Saved: 09-mobile-responsive-android-ios.png');

  // Tablet Viewport (820x1000 - iPad & Android Tablet)
  win.setSize(820, 1000);
  await new Promise(r => setTimeout(r, 2000));
  const tabletImg = await win.webContents.capturePage();
  fs.writeFileSync(path.join(screenshotsDir, '10-tablet-responsive-ipad.png'), tabletImg.toPNG());
  console.log('Saved: 10-tablet-responsive-ipad.png');

  win.destroy();

  console.log('All 10 real screenshots captured successfully!');
  app.quit();
}

// App lifecycle
app.whenReady().then(() => {
  if (process.env.SCREENSHOT_MODE === '1') {
    captureAllScreenshots();
    return;
  }
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
