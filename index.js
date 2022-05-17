const { app, BrowserWindow } = require('electron')
const client = require('discord-rich-presence')('975453682218983555');
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const { fetch } = require('cross-fetch');
const updater = require('electron-simple-updater');
const fs = require('fs');
updater.init('https://updater.shellshockers.srizan.ml/updates.json');

// the url for the webpage, maybe I'll change it on later builds.
function getUrlToLoad() {
  let url = 'https://shellshock.io/';

  return url;
}

// rich presence yesyes

try {
  client.updatePresence({
  state: 'In the app',
  details: 'Killing eggs',
  largeImageKey: 'icon',
  instance: true
});
} catch (err) {
  // execution continues if it couldn't connect to Discord, but notify the user via the console that it couldn't connect
  console.log('Could not connect to Discord Rich Presence, so try restarting the app, Discord or your entire computer.');
}

// window stuff
async function createWindow () {
      const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        icon: __dirname + './icon.png',
        title: "Shell Shockers",
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: false,
          nodeIntegrationInSubFrames: true
        }
      })
      // adblocking magic help this took a long time helphelphelp
      blocker = ElectronBlocker.parse(fs.readFileSync('./easylist.txt', 'utf-8'));
      blocker.enableBlockingInSession(mainWindow.webContents.session);
      // override changing the page title for Shell Shockers
      mainWindow.on('page-title-updated', function(e) {
        e.preventDefault()
      });

      mainWindow.loadURL(getUrlToLoad());
    }



// closing and opening app shit
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })