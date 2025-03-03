import { app, shell, BrowserWindow, ipcMain, protocol } from "electron";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import { join } from "path";
import icon from "../../resources/icon.png?asset";

import {
  createWorkflow,
  deleteWorkflow,
  getWorkflowDetail,
  getWorkflowList,
  updateWorkflow,
} from "./workflows";
import {
  clearAssests,
  getSafeFile,
  uploadSafeFile,
  uploadThumbnail,
} from "./files";

// const userDataPath = app.getPath("appData");

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 560,
    minHeight: 480,
    title: "I MY ME MIND",
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });
  mainWindow.maximize();

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  protocol.handle("safe-file", getSafeFile);

  ipcMain.handle("upload-safeFile", uploadSafeFile);
  ipcMain.handle("clear-assets", clearAssests);

  ipcMain.handle("upload-thumbnail", uploadThumbnail);

  ipcMain.handle("create-workflow", createWorkflow);
  ipcMain.handle("get-workflow-list", getWorkflowList);
  ipcMain.handle("get-workflow-detail", getWorkflowDetail);
  ipcMain.handle("update-workflow", updateWorkflow);
  ipcMain.handle("delete-workflow", deleteWorkflow);

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
