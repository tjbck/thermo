const { app, BrowserWindow, ipcMain, shell } = require('electron')
const SerialPort = require('serialport')


async function getDevicePath() {
    let devices = await SerialPort.list();
    for (device of devices) {
        if (device["manufacturer"].includes('Arduino')) {
            return device["path"]
        }
    }
}

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadFile('index.html')
    // mainWindow.webContents.openDevTools()
}

app.whenReady().then(async () => {
    createWindow()


    // let devices = await SerialPort.list();
    // console.log(devices)
    mainWindow.webContents.on('dom-ready', () => {
        mainWindow.webContents.send('device:path', "helo")
    })

})

ipcMain.on('image:minimize', (e, options) => {
    options.dest = path.join(os.homedir(), 'imageshrink')
    shrinkImage(options)
})



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
