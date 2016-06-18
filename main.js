const electron = require('electron');
//why inconsistency in captializing variables?
//this is because app is actually a reference to a global variable
//that is used to initialize a bunch of electron functions, I think
const {app, BrowserWindow} = electron;

//global reference to the main window so it wouldn't be closed because
//of JavaScript garbage collection
let win;

function createWindow() {
    win = new BrowserWindow({width: 800, height: 600});

    //Load index.html in the same directory
    win.loadURL(`file://${__dirname}/index.html`);

    //open dev tool when window loads
    win.webContents.openDevTools();

    //listen in on window close event and derefence win variable
    win.on('close', () => {
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
app.on('window-all-close', () => {

    //darwin = a flavor of osX?
    if (process.platform !=='darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})