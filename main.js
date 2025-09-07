const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 350,
    height: 500,
    resizable: false,
    autoHideMenuBar: true,
    // backgroundColor: '#433455',
    frame: false, // Removes default top bar
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // ✅ Use preload instead of remote
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.once('ready-to-show', () => {
  mainWindow.setSize(350, 500);
  mainWindow.center();
});

  // Handle minimize request
  ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
  });

  // Handle close request
  ipcMain.on('close-window', () => {
    mainWindow.close();
  });
}

app.whenReady().then(createWindow);
