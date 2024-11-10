export interface Eleve {
  id?: string
  nom: string
  prenom: string
  dateNaissance: string
  sexe: string
  numeroParent: string
}

export interface Inscription {
  id?: string
  eleveId: string
  classe: string
  montant: string
  dateInscription: Date
}

export interface Mensualite {
  id?: string
  inscriptionId: string
  montant: string
  moisPaye: string
  datePaiement: Date
}

export interface InfoScolaireEleve {
  id?: string
  nom: string
  prenom: string
  dateNaissance: string
  sexe: string
  numeroParent: string
  classe: string
  montantInscription: string
  dateInscription: Date
  mensualites: Record<string, Mensualite>
}

export enum Classe {
  CI_A,
  CI_B,
  CP_A,
  CP_B,
  CE1_A,
  CE1_B,
  CE2_A,
  CE2_B,
  CM1_A,
  CM1_B,
  CM2_A,
  CM2_B
}

export interface FormDataInscription {
  prenom: string
  nom: string
  dateNaissance: string
  sexe: string
  numeroParent: string
  classe: string
  montant: string
}

export interface ValidationErrorsInscription {
  nom?: string
  prenom?: string
  dateNaissance?: string
  sexe?: string
  numeroParent?: string
  classe?: string
  montant?: string
}

export interface FormDataPayement {
  montant: string
  mois: string
}

export interface ValidationErrorsPayement {
  montant?: string
  mois?: string
}

// export enum Sexe {
//   Masculin = 'M',
//   Feminin = 'F'
// }

// export enum Mois {
//   Janvier = 'Janvier',
//   Fevrier = 'Février',
//   Mars = 'Mars',
//   Avril = 'Avril',
//   Mai = 'Mai',
//   Juin = 'Juin',
//   Juillet = 'Juillet',
//   Aout = 'Août',
//   Septembre = 'Septembre',
//   Octobre = 'Octobre',
//   Novembre = 'Novembre',
//   Decembre = 'Décembre'
// }
