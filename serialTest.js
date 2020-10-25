const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline

async function getDevicePath() {
    let devices = await SerialPort.list();
    for (device of devices) {
        if (device["manufacturer"].includes('Arduino')) {
            return device["path"]
        }
    }
}
async function main() {
    let devicePath = await getDevicePath()

    const port = new SerialPort(devicePath, { baudRate: 9600 }, function (err) {
        if (err) {
            return console.log('Error: ', err.message)
        }
    })

    const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
    parser.on('data', console.log)

    // Read data that is available but keep the stream in "paused mode"
    // port.on('readable', function () {
    //     console.log('Data:', port.read())
    // })

    // Switches the port into "flowing mode"
    // port.on('data', function (data) {
    //     console.log('Data:', data)
    // })

    // Pipe the data into another stream (like a parser or standard out)
    // const lineStream = port.pipe(new Readline())
}

main()

