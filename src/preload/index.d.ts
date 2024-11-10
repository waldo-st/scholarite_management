import { ElectronAPI } from '@electron-toolkit/preload'
import {
  Eleve,
  InfoScolaireEleve,
  FormDataInscription,
  Inscription,
  Mensualite
} from '@shared/models'

declare global {
  interface Window {
    electron: ElectronAPI
    firestoreApi?: {
      eleves?: {
        add: (eleve: Eleve) => Promise<string>
        inscrire: (inscription: Inscription) => Promise<string>
        getAll: () => Promise<ELeve[]>
        getInfoScolaritesElevesByClasse: (classe: string) => Promise<InfoScolaireEleve[]>
        payementMensualite: (mensualite: Mensualite) => Promise<string>
      }
    }
  }
}
