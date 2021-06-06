// Modules
const {app, BrowserWindow, Menu} = require('electron');
const windowStateKeeper = require('electron-window-state');
const mainMenu = require('./Screen/menus');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
 let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  const winState = windowStateKeeper({
    defaultWidth: 1000, defaultHeight:800
  });

  mainWindow = new BrowserWindow({
    width: winState.width, height: winState.height,
    x: winState.x, y: winState.y,
    //Disabilita os botoes da janela do navegador
    //frame:false,
    //Tamanho min da tela
    minWidth: 500, minHeight:400,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("./frontend/index.html");

  // Menu da Aplicação
  Menu.setApplicationMenu(mainMenu);

  // Salva o estado da tela
  winState.manage(mainWindow);

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', () => {
    createWindow();
})

// Quit when all windows are closed -
app.on('window-all-closed', () => {
  // eslint-disable-next-line no-undef
  if (process.platform !== 'darwin') app.quit();
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow();
})
