const { ipcRenderer } = require('electron');

function addFading(el) {
  console.log('🪲 | addFading');
  el.classList.add("fading");
}
function stopFading(el) {
  console.log('🪲 | stopFading');
  el.classList.remove("fading");
}

const COMMAND_TO_ELEMENT_ID_MAP = {
  'chrome-default': 'default',
  'chrome-3pcd': '3pcd',
  'chrome-default-ps': 'default-ps',
  'chrome-3pcd-ps': '3pcd-ps',
}

document.getElementById(COMMAND_TO_ELEMENT_ID_MAP['chrome-default']).addEventListener('click', () => {
  const el = document.getElementById(COMMAND_TO_ELEMENT_ID_MAP['chrome-default']);
  addFading(el);
  ipcRenderer.send('run-command', 'chrome-default');
  stopFading(el);
});

document.getElementById(COMMAND_TO_ELEMENT_ID_MAP['chrome-3pcd']).addEventListener('click', () => {
  const el = document.getElementById(COMMAND_TO_ELEMENT_ID_MAP['chrome-3pcd']);
  addFading(el);
  ipcRenderer.send('run-command', 'chrome-3pcd');
  stopFading(el);
});

document.getElementById(COMMAND_TO_ELEMENT_ID_MAP['chrome-default-ps']).addEventListener('click', () => {
  const el = document.getElementById(COMMAND_TO_ELEMENT_ID_MAP['chrome-default-ps']);
  addFading(el);
  ipcRenderer.send('run-command', 'chrome-default-ps');
  stopFading(el);
});

document.getElementById(COMMAND_TO_ELEMENT_ID_MAP['chrome-3pcd-ps']).addEventListener('click', () => {
  const el = document.getElementById(COMMAND_TO_ELEMENT_ID_MAP['chrome-3pcd-ps']);
  addFading(el);
  ipcRenderer.send('run-command', 'chrome-3pcd-ps');
  stopFading(el);
});

ipcRenderer.on('end-command', (event, command) => {
  const elId = COMMAND_TO_ELEMENT_ID_MAP[command]
  if (elId) {
    const el = document.getElementById(elId);
    stopFading(el);
  }
})