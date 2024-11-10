import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron/renderer'
import { Eleve, Inscription, Mensualite } from '@shared/models'

// Custom APIs for renderer
const firestoreAPI = {
  eleves: {
    add: (eleve: Eleve) => ipcRenderer.invoke('eleves:add', eleve),
    inscrire: (inscription: Inscription) => ipcRenderer.invoke('inscriptions:add', inscription),
    getAll: () => ipcRenderer.invoke('eleves:getAll'),
    getInfoScolaritesElevesByClasse: (classe: string) =>
      ipcRenderer.invoke('eleves:getInfoScolaritesElevesByClasse', classe),
    payementMensualite: (mensualite: Mensualite) => ipcRenderer.invoke('mensualite:add', mensualite)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('firestoreApi', firestoreAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.firestoreApi = firestoreAPI
}
