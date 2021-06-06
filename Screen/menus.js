const {Menu} = require('electron');

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
]);

module.exports = mainMenu;
