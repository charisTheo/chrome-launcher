const { ipcRenderer } = require('electron');

function addFading(el) {
  el.classList.add("fading");
}

function stopFading(el) {
  el.classList.remove("fading");
}

document.getElementById('default').addEventListener('click', () => {
  let el = document.getElementById('default');
  addFading(el);
  ipcRenderer.send('run-command', 'chrome-default');
  stopFading(el);
});

document.getElementById('3pcd').addEventListener('click', () => {
  let el = document.getElementById('3pcd');
  addFading(el);
  ipcRenderer.send('run-command', 'chrome-3pcd');
  stopFading(el);
});

document.getElementById('default-ps').addEventListener('click', () => {
  let el = document.getElementById('default-ps');
  addFading(el);
  ipcRenderer.send('run-command', 'chrome-default-ps');
  stopFading(el);
});

document.getElementById('3pcd-ps').addEventListener('click', () => {
  let el = document.getElementById('3pcd-ps');
  addFading(el);
  ipcRenderer.send('run-command', 'chrome-3pcd-ps');
  stopFading(el);
});
