import { getDb } from '@shared/firebase'
import { Eleve, Inscription, Mensualite } from '@shared/models'
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore/lite'

export const addEleve = async (eleve: Omit<Eleve, 'id'>) => {
  const db = getDb()
  try {
    const docRef = await addDoc(collection(db, 'eleves'), eleve)
    return docRef.id
  } catch (error) {
    console.error('Error adding eleve', error)
    throw error
  }
}

export const addInscrition = async (inscrit: Omit<Inscription, 'id'>) => {
  const db = getDb()
  try {
    const inscriptionRef = collection(db, 'inscriptions')
    const docRef = await addDoc(inscriptionRef, inscrit)
    return docRef.id
  } catch (error) {
    console.error('Error adding inscription', error)
    throw error
  }
}

export const payementMensualite = async (payer: Omit<Mensualite, 'id'>) => {
  const db = getDb()
  try {
    const mensualiteRef = collection(db, 'mensualites')
    const docRef = await addDoc(mensualiteRef, payer)
    return docRef.id
  } catch (error) {
    console.error('Error adding mensualite', error)
    throw error
  }
}

export const getEleveById = async (idEleve: string) => {
  const db = getDb()
  try {
    const docRef = doc(db, 'eleves', idEleve)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      }
    } else {
      console.log('Aucun élève trouvé avec cet ID!')
      return null
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'élève:", error)
    throw error
  }
}

export const getEleves = async () => {
  const db = getDb()
  try {
    const querySnapshot = await getDocs(collection(db, 'inscriptions'))
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    console.log('DATA =>>> ', data)
    return data
  } catch (error) {
    console.error('Error getting eleves: ', error)
    throw error
  }
}

export const getInfoScolaritesElevesByClasse = async (classe: string) => {
  const db = getDb()
  try {
    const inscriptionsQuery = query(collection(db, 'inscriptions'), where('classe', '==', classe))
    const inscriptonsSnapshot = await getDocs(inscriptionsQuery).catch((error) => {
      console.error('Erreur lors de la recuperation des inscriptions:', error)
    })

    if (!inscriptonsSnapshot) return []

    const inscriptionsMensualitesWithEleves = await Promise.all(
      inscriptonsSnapshot.docs.map(async (inscriptionDoc) => {
        const inscription = inscriptionDoc.data() as Inscription
        const inscriptionId = inscriptionDoc.id

        // Ajouter un delai entre les requetes pour eviter la limitation
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Récupérer les données de l'élève
        const eleveQueryDoc = doc(db, 'eleves', inscription.eleveId)
        const eleveDoc = await getDoc(eleveQueryDoc)

        if (!eleveDoc || !eleveDoc.exists()) {
          console.log('Élève non trouvé pour l ID:', inscription.eleveId)
          return null
        }

        const eleve = eleveDoc.data() as Eleve

        // Recuperer les mensualites de l'eleve
        const mensualitesQuery = query(
          collection(db, 'mensualites'),
          where('inscriptionId', '==', inscriptionId)
        )
        const mensualitesSnapshot = await getDocs(mensualitesQuery)

        const mensualites = mensualitesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Mensualite[]

        //Organiser les mensualites par mois
        const mensualitesParMois = mensualites.reduce(
          (acc, mensualite) => {
            acc[mensualite.moisPaye] = mensualite
            return acc
          },
          {} as Record<string, Mensualite>
        )
        return {
          id: inscriptionId,
          ...eleve,
          classe: inscription.classe,
          montant: inscription.montant,
          dateInscription: inscription.dateInscription,
          mensualites: mensualitesParMois
        }
      })
    )

    return inscriptionsMensualitesWithEleves.filter(Boolean)
  } catch (error) {
    console.error('Erreur lors de la récupération des élèves:', error)
    throw error
  }
}
