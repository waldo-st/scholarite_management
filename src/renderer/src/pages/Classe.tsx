import { Button } from '@renderer/components/Button'
import { FormInscritption, FormPayement } from '@renderer/components/form'
import { NavBarClass } from '@renderer/components/NavBarClass'
import { Popup } from '@renderer/components/Popup'
import {
  Eleve,
  FormDataInscription,
  FormDataPayement,
  InfoScolaireEleve,
  Inscription,
  Mensualite
} from '@shared/models'
import { useEffect, useState } from 'react'
import DataTable, { TableColumn, TableStyles } from 'react-data-table-component'
import { FaSearch } from 'react-icons/fa'

import { useLocation } from 'react-router-dom'

export interface EleveInscriptionAvecRang extends InfoScolaireEleve {
  rang?: number
}

function Classe() {
  const location = useLocation()
  const [eleves, setEleves] = useState<Array<EleveInscriptionAvecRang>>([])
  const [classeActuelle, setClasseActuelle] = useState('')
  const [selectedRow, setSelectedRow] = useState<InfoScolaireEleve | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [cacheMemoryInfoEleves, setCacheMemoryInfoEleves] = useState<InfoScolaireEleve[] | []>([])

  useEffect(() => {
    const state = location.state
    if (state) {
      setClasseActuelle(state.classe)
    }
  }, [location])

  useEffect(() => {
    if (classeActuelle != '') {
      getInfoScolaritesElevesByClasse(classeActuelle)
    }
  }, [classeActuelle])

  useEffect(() => {
    dataInfoScolaireEleve(cacheMemoryInfoEleves)
    console.log('Classe => ', eleves)
  }, [cacheMemoryInfoEleves])

  const getInfoScolaritesElevesByClasse = async (classe: string | undefined) => {
    if (!classe) return
    setIsLoading(true)
    try {
      if (
        !window.firestoreApi ||
        !window.firestoreApi.eleves ||
        !window.firestoreApi.eleves.getInfoScolaritesElevesByClasse
      ) {
        console.error("L'API Firestore n'est pas disponible")
        return
      }
      const allEleves = await window.firestoreApi.eleves.getInfoScolaritesElevesByClasse(classe)
      if (allEleves) {
        setCacheMemoryInfoEleves(allEleves)
        dataInfoScolaireEleve(allEleves)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des informations scolaire des élèves:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePayement = async (data: FormDataPayement) => {
    if (!window.firestoreApi || !window.firestoreApi.eleves) {
      console.error("L'API Firestore n'est pas disponible")
      return
    }
    const isOnline = window.navigator.onLine

    console.log('IsOnline ==> ,', isOnline)
    try {
      if (!selectedRow?.id) return
      const mensualite: Mensualite = {
        inscriptionId: selectedRow.id,
        montant: data.montant,
        moisPaye: data.mois,
        datePaiement: new Date()
      }

      const mensuliteId = await window.firestoreApi.eleves.payementMensualite(mensualite)

      setCacheMemoryInfoEleves((prevState) => {
        const index = prevState.findIndex((eleve) => eleve.id === mensualite.inscriptionId)
        // Si l'élève n'existe pas
        if (index === -1) return prevState

        // Si l'élève existe, créer un nouveau tableau avec la mensualite de l'élève mis à jour
        const newState = [...prevState]
        newState[index] = {
          ...newState[index],
          mensualites: {
            ...newState[index].mensualites,
            [mensualite.moisPaye]: mensualite
          }
        }
        return newState
      })

      closeModal('my_modal_2')
    } catch (error) {
      console.error("Erreur lors d'ajout du payement de l'eleve: ", error)
    }
  }

  const handleInscription = async (data: FormDataInscription) => {
    if (!window.firestoreApi || !window.firestoreApi.eleves) {
      console.error("L'API Firestore n'est pas disponible")
      return
    }
    const isOnline = window.navigator.onLine

    console.log('IsOnline ==> ,', isOnline)
    try {
      const eleve: Eleve = {
        nom: data.nom.toUpperCase(),
        prenom: data.prenom,
        dateNaissance: data.dateNaissance,
        sexe: data.sexe,
        numeroParent: data.numeroParent
      }
      const idEleve = await window.firestoreApi.eleves.add(eleve)

      const inscrit: Inscription = {
        eleveId: idEleve,
        classe: data.classe.toUpperCase(),
        montant: data.montant,
        dateInscription: new Date()
      }

      const inscriptionId = await window.firestoreApi.eleves.inscrire(inscrit)

      const infoEleves: InfoScolaireEleve = {
        classe: inscrit.classe,
        dateInscription: inscrit.dateInscription,
        dateNaissance: eleve.dateNaissance,
        mensualites: {},
        montantInscription: inscrit.montant,
        nom: eleve.nom,
        numeroParent: eleve.numeroParent,
        prenom: eleve.prenom,
        sexe: eleve.sexe,
        id: inscriptionId
      }
      setCacheMemoryInfoEleves((prevState) => [...prevState, infoEleves])

      closeModal('my_modal_1')
    } catch (error) {
      console.error("Erreur lors d'ajout de l'eleve: ", error)
    }
  }

  const closeModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null
    if (modal) {
      modal.close()
    }
  }

  const handleClasse = (classe: string) => {
    setClasseActuelle(classe)
  }

  const columns: Array<TableColumn<EleveInscriptionAvecRang>> = [
    {
      name: '',
      cell: (row: EleveInscriptionAvecRang) => (
        <Button eleve={row} onSelectEleve={setSelectedRow} />
      ),
      width: '50px',
      sortable: false
    },
    {
      name: 'Nom',
      selector: (row: EleveInscriptionAvecRang) => row.nom
    },
    {
      name: 'Prénom',
      selector: (row: EleveInscriptionAvecRang) => row.prenom
    },
    {
      name: 'Tel Parent',
      selector: (row: EleveInscriptionAvecRang) => row.numeroParent
    },
    // {
    //   name: 'Inscription',
    //   selector: (row) => row.inscription
    // },
    {
      name: 'Octobre',
      selector: (row: EleveInscriptionAvecRang) =>
        row.mensualites['Octobre'] ? row.mensualites['Octobre'].montant.toString() : ''
    },
    {
      name: 'Novembre',
      selector: (row: EleveInscriptionAvecRang) =>
        row.mensualites['Novembre'] ? row.mensualites['Novembre'].montant.toString() : ''
    },
    {
      name: 'Decembre',
      selector: (row: EleveInscriptionAvecRang) =>
        row.mensualites['Decembre'] ? row.mensualites['Decembre'].montant.toString() : ''
    },
    {
      name: 'Janvier',
      selector: (row: EleveInscriptionAvecRang) =>
        row.mensualites['Janvier'] ? row.mensualites['Janvier'].montant.toString() : ''
    },
    {
      name: 'Février',
      selector: (row: EleveInscriptionAvecRang) =>
        row.mensualites['Fevrier'] ? row.mensualites['Fevrier'].montant.toString() : ''
    },
    {
      name: 'Mars',
      selector: (row: EleveInscriptionAvecRang) =>
        row.mensualites['Mars'] ? row.mensualites['Mars'].montant.toString() : ''
    },
    {
      name: 'Avril',
      selector: (row: EleveInscriptionAvecRang) =>
        row.mensualites['Avril'] ? row.mensualites['Avril'].montant.toString() : ''
    },
    {
      name: 'Mai',
      selector: (row: EleveInscriptionAvecRang) =>
        row.mensualites['Mai'] ? row.mensualites['Mai'].montant.toString() : ''
    }
  ]

  // Fonction pour trier et ajouter le rang
  const dataInfoScolaireEleve = (data: InfoScolaireEleve[]) => {
    // Trier par nom
    const dataTrie = [...data].sort((a, b) => a.nom.localeCompare(b.nom))

    // Ajouter le rang
    const dataAvecRang: EleveInscriptionAvecRang[] = dataTrie.map((eleveInscrit, index) => ({
      ...eleveInscrit,
      rang: index + 1
    }))
    setEleves(dataAvecRang)
  }

  const conditionalRowStyles = [
    {
      when: (row: EleveInscriptionAvecRang): boolean => {
        return row.rang != undefined && row.rang % 2 == 0
      },
      style: {
        backgroundColor: '#999ab621',
        color: 'black'
        // fontWeight: '500',
        // '&:hover': {
        //   cursor: 'pointer'
        // }
      }
    }
  ]

  const customStyles = {
    rows: {
      style: {
        minHeight: '45px' // override the row height
      }
    },
    headCells: {
      style: {
        color: 'white',
        background: 'blue',
        fontWeight: '600',
        fontSize: '1rem'
      }
    },
    cells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px'
        },
        display: 'flex',
        justifyContent: 'center',
        fontWeight: '500',
        fontSize: '0.875rem',
        padding: '0'
      }
    }
  } as TableStyles

  return (
    <div className="w-full p-3">
      <div className="flex flex-col items-end w-full h-screen">
        <NavBarClass classe={classeActuelle} onClasseChange={handleClasse} />
        <label className="input input-bordered  border-2 flex items-center gap-2 bg-slate-50 w-80 h-10 text-black font-extralight mb-1">
          <input type="text" className="grow" placeholder="Recherche un élève..." />
          <button className="badge badge-info bg-white">
            <FaSearch className="text-lg" />
          </button>
        </label>
        <DataTable
          columns={columns}
          customStyles={customStyles}
          data={eleves}
          conditionalRowStyles={conditionalRowStyles}
          progressPending={isLoading}
        ></DataTable>
      </div>
      <Popup id="my_modal_1">
        <FormInscritption onSubmit={handleInscription} onClose={closeModal} />
      </Popup>
      <Popup id="my_modal_2">
        {selectedRow && (
          <FormPayement eleve={selectedRow} onSubmit={handlePayement} onClose={closeModal} />
        )}
      </Popup>
    </div>
  )
}

export { Classe }
