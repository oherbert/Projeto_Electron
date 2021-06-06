// Modules
const {app, BrowserWindow, Menu} = require('electron');
const windowStateKeeper = require('electron-window-state');
const run = require('./database');
const os = require('os');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const computerName = os.hostname();
console.log(computerName);

const mainMenu = Menu.buildFromTemplate([
  {
    label:'Principal',
    submenu: [
      {label:'Salvar',click:()=>{console.log('Click em salvar')}, accelerator:'Ctrl+S'},
      {label:'Tela Cheia',role:'togglefullscreen'},
      {label:'Sistema', 
            submenu:[{label:'Sair',click:()=>{console.log('Click em sair')},accelerator:'Esc'},
                     {label:'Help'}]}
    ]
  }
])

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  // Savar a possição da Tela
  const winState = windowStateKeeper({
    defaultWidth: 1000, defaultHeight:800
  })

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
  mainWindow.loadFile('index.html');
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

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow();
})
