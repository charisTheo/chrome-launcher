/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

const { ipcRenderer } = require('electron');

const psatExtensionCheckbox = document.querySelector('#psat-extension')

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
}

document.getElementById(COMMAND_TO_ELEMENT_ID_MAP['chrome-default']).addEventListener('click', () => {
  const el = document.getElementById(COMMAND_TO_ELEMENT_ID_MAP['chrome-default']);
  addFading(el);
  ipcRenderer.send('run-command', psatExtensionCheckbox.checked ? 'chrome-default-ps' : 'chrome-default');
  stopFading(el);
});

document.getElementById(COMMAND_TO_ELEMENT_ID_MAP['chrome-3pcd']).addEventListener('click', () => {
  const el = document.getElementById(COMMAND_TO_ELEMENT_ID_MAP['chrome-3pcd']);
  addFading(el);
  ipcRenderer.send('run-command', psatExtensionCheckbox.checked ? 'chrome-3pcd-ps' : 'chrome-3pcd');
  stopFading(el);
});

ipcRenderer.on('end-command', (event, command) => {
  const elId = COMMAND_TO_ELEMENT_ID_MAP[command]
  if (elId) {
    const el = document.getElementById(elId);
    stopFading(el);
  }
})