const { app, BrowserWindow, Menu } = require("electron");
const { join } = require("path");
const { config } = require("dotenv");
config();

console.customLog = function(string) {
	this.log(`${new Date().toUTCString()} ${string}`);
};

function isDarwin() {
	return process.platform === "darwin";
}

app.on("ready", () => {
	console.customLog("The app is ready!");
	const mainWindow = new BrowserWindow({
		height: 800,
		width: 800,
		center: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	mainWindow.loadURL(`file://${join(__dirname, "./Public/Index.html")}`);

	const customMenu = Menu.buildFromTemplate([
		{
			// label creates a menu for us..
			label: "Options",
			// Menu inside a menu
			submenu: [
				{
					// Label of the option of the menu
					label: "Quit",
					// Function to work with what happens on click
					click() {
						app.quit();
					},
					// Hotkey stuff, nice naming
					accelerator: `${isDarwin() ? "Command" : "Ctrl"}+Q`,
				},
				{
					label: "Reload",
					click() {
						return mainWindow.reload();
					},
					accelerator: `${isDarwin() ? "Command" : "Ctrl"}+R`,
				},
			],
		},
	]);

	mainWindow.setMenu(customMenu);

	mainWindow.on("close", () => {
		app.quit();
	});

	if(process.env.NODE_ENV !== "production") mainWindow.webContents.openDevTools();
});