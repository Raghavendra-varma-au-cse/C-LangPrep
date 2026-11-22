const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

app.disableHardwareAcceleration();

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'public', 'screenshots');

async function captureTab(win, tabName, filename, waitMs = 2000) {
  // Click tab button or execute state change
  await win.webContents.executeJavaScript(`
    (() => {
      const buttons = Array.from(document.querySelectorAll('header button, nav button, div button'));
      const target = buttons.find(b => b.innerText && b.innerText.includes('${tabName}'));
      if (target) target.click();
    })()
  `);

  await new Promise(r => setTimeout(r, waitMs));
  const img = await win.webContents.capturePage();
  const filePath = path.join(SCREENSHOTS_DIR, filename);
  fs.writeFileSync(filePath, img.toPNG());
  console.log(`Saved screenshot: ${filename} (${img.toPNG().length} bytes)`);
}

async function run() {
  try {
    await app.whenReady();

    if (!fs.existsSync(SCREENSHOTS_DIR)) {
      fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
    }

    // 1. Desktop Window (1440x920)
    const win = new BrowserWindow({
      width: 1440,
      height: 920,
      show: false,
      webPreferences: {
        offscreen: true
      }
    });

    console.log('Loading http://localhost:3000 for Desktop captures...');
    await win.loadURL('http://localhost:3000');
    await new Promise(r => setTimeout(r, 3000));

    // Capture 1: Hero 150-Level Journey
    await captureTab(win, '150-Level Journey', '01-hero-curriculum-150.png', 1500);

    // Capture 2: Error Doctor Lab
    await captureTab(win, 'Error Doctor Lab', '02-c-error-doctor-lab.png', 2000);

    // Capture 3: Visual Block Builder
    await captureTab(win, 'Visual Block Builder', '03-visual-block-studio.png', 2000);

    // Capture 4: Systems (Redis/Git/DOOM)
    await captureTab(win, 'Systems (Redis/Git/DOOM)', '04-systems-engineering-lab.png', 2000);

    // Capture 5: Live C Compiler
    await captureTab(win, 'Live C Compiler', '05-live-compiler-telemetry.png', 2000);

    // Capture 6: 32 Keywords
    await captureTab(win, '32 Keywords', '06-keywords-encyclopedia.png', 2000);

    // Capture 7: Everyday Machines
    await captureTab(win, 'Everyday Machines', '07-everyday-machines.png', 2000);

    // Capture 8: Global Resources
    await captureTab(win, 'Global Resources', '08-global-c-resources.png', 2000);

    win.destroy();

    // 2. Mobile Responsive Window (412x915 - Android & iPhone Viewport)
    console.log('Loading http://localhost:3000 for Mobile Responsive captures...');
    const mobileWin = new BrowserWindow({
      width: 412,
      height: 915,
      show: false,
      webPreferences: {
        offscreen: true
      }
    });

    await mobileWin.loadURL('http://localhost:3000');
    await new Promise(r => setTimeout(r, 3000));

    const mobileImg = await mobileWin.webContents.capturePage();
    fs.writeFileSync(path.join(SCREENSHOTS_DIR, '09-mobile-responsive-android-ios.png'), mobileImg.toPNG());
    console.log('Saved screenshot: 09-mobile-responsive-android-ios.png');

    // 3. Tablet Responsive Window (820x1180 - iPad Air Viewport)
    const tabletWin = new BrowserWindow({
      width: 820,
      height: 1000,
      show: false,
      webPreferences: {
        offscreen: true
      }
    });

    await tabletWin.loadURL('http://localhost:3000');
    await new Promise(r => setTimeout(r, 2500));

    const tabletImg = await tabletWin.webContents.capturePage();
    fs.writeFileSync(path.join(SCREENSHOTS_DIR, '10-tablet-responsive-ipad.png'), tabletImg.toPNG());
    console.log('Saved screenshot: 10-tablet-responsive-ipad.png');

    tabletWin.destroy();
    mobileWin.destroy();

    console.log('All screenshots captured successfully!');
  } catch (err) {
    console.error('Error taking screenshots:', err);
  } finally {
    app.quit();
  }
}

run();
