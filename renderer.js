const { ipcRenderer } = require('electron');

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
