import { app, BrowserWindow } from "electron";
import path from "path";

if(require("electron-squirrel-startup")) {
	app.quit();
}

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
	});

	mainWindow.loadFile(path.join(__dirname, "index.html"));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if(process.platform === "darwin") return;

	app.quit();
});

app.on("activate", () => {
	if(BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});