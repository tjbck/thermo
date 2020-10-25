// const path = require('path')
// const os = require('os')
// const { ipcRenderer } = require('electron')

// ipcRenderer.on('device:path', (e, msg) => {
//     alert(msg)
//     console.log(e)
// })

const SerialPort = require('serialport')

console.log('hello')

async function getDevicePath() {
    let devices = await SerialPort.list();
    for (device of devices) {
        if (device["manufacturer"].includes('Arduino')) {
            return device["path"]
        }
    }
}

console.log(getDevicePath())