import { FormEvent, useState } from 'react'
import {
  FormDataInscription,
  FormDataPayement,
  InfoScolaireEleve,
  ValidationErrorsInscription,
  ValidationErrorsPayement
} from '@shared/models'

interface FormPayementProps {
  eleve: InfoScolaireEleve
  onSubmit: (data: FormDataPayement) => void
  onClose: (id: string) => void
}

const FormPayement = ({ onSubmit, onClose, eleve }: FormPayementProps) => {
  const Form: FormDataPayement = {
    montant: '',
    mois: 'Mois'
  }

  const [formData, setFormData] = useState<FormDataPayement>(Form)
  const [errors, setErrors] = useState<ValidationErrorsPayement>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      onSubmit(formData)
      setErrors({})
      setFormData(Form) // Réinitialiser le formulaire
    }
  }

  // Fonction de validation
  const validate = (): ValidationErrorsPayement => {
    const errors: ValidationErrorsPayement = {}

    // Validation du montant
    if (!formData.montant.trim()) {
      errors.montant = 'Le montant est requis'
    } else if (isNaN(Number(formData.montant))) {
      errors.montant = 'Le montant doit être un nombre'
    }

    // Validation du sexe
    if (formData.mois === 'Mois') {
      errors.mois = 'Le mois doit être sélectionné'
    }

    return errors
  }

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // Empêche la soumission du formulaire
    setFormData(Form)
    setErrors({})
    onClose('my_modal_2')
  }
  return (
    <form
      onSubmit={handleSubmit}
      method="dialog"
      className="flex flex-col p-0 m-0 gap-3 w-full min-h-96 "
    >
      <div className="w-full text-center relative">
        <span className="text-black font-extrabold text-xl">Payement Mensualité</span>
        <button onClick={handleClose} className="btn btn-xs text-white absolute right-0">
          X
        </button>
      </div>
      <div className="flex flex-col justify-center items-center w-full gap-5 mt-3 text-black ">
        <div className="text-start w-full px-5 ">
          <span className=" text-base font-bold">Prenom Eleve:</span>
          <span className="font-medium text-sm mx-5">{eleve.prenom}</span>
        </div>
        <div className="text-start w-full px-5 ">
          <span className=" text-base font-bold">Nom Eleve:</span>
          <span className="font-medium text-sm mx-5">{eleve.nom}</span>
        </div>
        <div className="text-start w-full px-5 ">
          <span className=" text-base font-bold">Numero Parent: </span>
          <span className="font-medium text-sm mx-5">{eleve.numeroParent}</span>
        </div>
        <div className="text-start w-full px-5 ">
          <span className=" text-base font-bold">Classe: </span>
          <span className="font-medium text-sm mx-5">{eleve.classe}</span>
        </div>
        <div className="flex flex-row gap-3">
          <div className="flex-col">
            <input
              type="text"
              placeholder="Montant"
              name="montant"
              onChange={handleChange}
              value={formData.montant}
              className={`input input-bordered w-full font-bold bg-slate-100 text-black ${
                errors.montant ? 'input-error' : ''
              }`}
            />
            {errors.montant && <p className="text-red-500 text-xs mt-1">{errors.montant}</p>}
          </div>
          <div className="flex-col">
            <select
              name="mois"
              value={formData.mois}
              onChange={handleChange}
              className={`select select-bordered w-full font-bold bg-slate-100 text-black ${
                errors.mois ? 'select-error' : ''
              }`}
            >
              <option disabled>Mois</option>
              <option>Octobre</option>
              <option>Novembre</option>
              <option>Decembre</option>
              <option>Janvier</option>
              <option>Fevrier</option>
              <option>Mars</option>
              <option>Avril</option>
              <option>Mai</option>
            </select>
            {errors.mois && <p className="text-red-500 text-xs mt-1">{errors.mois}</p>}
          </div>
        </div>
        <button className="btn btn-wide bg-blue-600 border-none text-white text-lg font-bold">
          Payer
        </button>
      </div>
    </form>
  )
}

interface FormInscriptionProps {
  onSubmit: (data: FormDataInscription) => void
  onClose: (id: string) => void
}

const FormInscritption = ({ onSubmit, onClose }: FormInscriptionProps) => {
  const Form: FormDataInscription = {
    nom: '',
    prenom: '',
    dateNaissance: '',
    sexe: 'Sexe',
    numeroParent: '',
    classe: '',
    montant: ''
  }

  const [formData, setFormData] = useState<FormDataInscription>(Form)
  const [errors, setErrors] = useState<ValidationErrorsInscription>({})
  // Fonction de validation
  const validate = (): ValidationErrorsInscription => {
    const errors: ValidationErrorsInscription = {}

    // Validation du prénom
    if (!formData.prenom.trim()) {
      errors.prenom = 'Le prénom est requis'
    } else if (formData.prenom.length < 2) {
      errors.prenom = 'Le prénom doit contenir au moins 2 caractères'
    }

    // Validation du nom
    if (!formData.nom.trim()) {
      errors.nom = 'Le nom est requis'
    } else if (formData.nom.length < 2) {
      errors.nom = 'Le nom doit contenir au moins 2 caractères'
    }

    // Validation de la date de naissance
    if (!formData.dateNaissance) {
      errors.dateNaissance = 'La date de naissance est requise'
    }

    // Validation du sexe
    if (formData.sexe === 'Sexe') {
      errors.sexe = 'Le sexe doit être sélectionné'
    }

    // Validation du numéro de parent
    if (!formData.numeroParent.trim()) {
      errors.numeroParent = 'Le numéro du parent est requis'
    } else if (!/^\d{9,}$/.test(formData.numeroParent)) {
      errors.numeroParent = 'Le numéro doit contenir au moins 9 chiffres'
    }

    // Validation de la classe
    if (!formData.classe.trim()) {
      errors.classe = 'La classe est requise'
    }

    // Validation du montant
    if (!formData.montant.trim()) {
      errors.montant = 'Le montant est requis'
    } else if (isNaN(Number(formData.montant))) {
      errors.montant = 'Le montant doit être un nombre'
    }

    return errors
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      onSubmit(formData)
      setErrors({})
      setFormData(Form) // Réinitialiser le formulaire
    }
  }

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // Empêche la soumission du formulaire
    setFormData(Form)
    setErrors({})
    onClose('my_modal_1')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col m-0 p-0 gap-3 w-full h-full ">
      <div className="w-full text-center relative">
        <span className="text-black font-extrabold text-xl">Inscrire un nouveau élève</span>
        <button onClick={handleClose} className="btn btn-xs text-white absolute right-0">
          X
        </button>
      </div>
      <div className="flex flex-col justify-center items-center w-full gap-4">
        <div className="w-full max-w-xs">
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Prenom"
            className={`input input-bordered w-full font-bold bg-slate-100 text-black ${
              errors.prenom ? 'input-error' : ''
            }`}
          />
          {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
        </div>
        <div className="w-full max-w-xs">
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom"
            className={`input input-bordered w-full font-bold bg-slate-100 text-black ${
              errors.nom ? 'input-error' : ''
            }`}
          />
          {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
        </div>
        <div className="flex w-80 gap-2 ">
          <div className="flex-1">
            <input
              type="date"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              className={`input input-bordered w-full font-bold bg-slate-100 text-black ${
                errors.dateNaissance ? 'input-error' : ''
              }`}
            />
            {errors.dateNaissance && (
              <p className="text-red-500 text-xs mt-1">{errors.dateNaissance}</p>
            )}
          </div>
          <div className="w-24">
            <select
              name="sexe"
              value={formData.sexe}
              onChange={handleChange}
              className={`select select-bordered w-full font-bold bg-slate-100 text-black ${
                errors.sexe ? 'select-error' : ''
              }`}
            >
              <option disabled>Sexe</option>
              <option>M</option>
              <option>F</option>
            </select>
            {errors.sexe && <p className="text-red-500 text-xs mt-1">{errors.sexe}</p>}
          </div>
        </div>
        <div className="w-full max-w-xs">
          <input
            type="text"
            name="numeroParent"
            value={formData.numeroParent}
            onChange={handleChange}
            placeholder="Numero parent"
            className={`input input-bordered w-full font-bold bg-slate-100 text-black ${
              errors.numeroParent ? 'input-error' : ''
            }`}
          />
          {errors.numeroParent && (
            <p className="text-red-500 text-xs mt-1">{errors.numeroParent}</p>
          )}
        </div>
        <div className="flex w-80 gap-2">
          <div className="flex-1">
            <input
              type="text"
              name="classe"
              value={formData.classe}
              onChange={handleChange}
              placeholder="Classe"
              className={`input input-bordered w-full font-bold bg-slate-100 text-black ${
                errors.classe ? 'input-error' : ''
              }`}
            />
            {errors.classe && <p className="text-red-500 text-xs mt-1">{errors.classe}</p>}
          </div>
          <div className="flex-1">
            <input
              type="text"
              name="montant"
              value={formData.montant}
              onChange={handleChange}
              placeholder="Montant"
              className={`input input-bordered w-full font-bold bg-slate-100 text-black ${
                errors.montant ? 'input-error' : ''
              }`}
            />
            {errors.montant && <p className="text-red-500 text-xs mt-1">{errors.montant}</p>}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-wide bg-blue-600 border-none text-white text-lg font-bold"
        >
          Inscrire
        </button>
      </div>
    </form>
  )
}
export { FormInscritption, FormPayement }
