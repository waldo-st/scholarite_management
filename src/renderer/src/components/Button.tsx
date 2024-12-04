// import React from 'react'
import { GiPayMoney } from 'react-icons/gi'
import { MdDeleteForever, MdMode } from 'react-icons/md'
import { LuPencilLine } from 'react-icons/lu'
import { EleveInscriptionAvecRang } from '@renderer/pages/Classe'

interface ButtonProps {
  eleve: EleveInscriptionAvecRang
  onSelectEleve: (eleve: EleveInscriptionAvecRang) => void
}
const Button = ({ eleve, onSelectEleve }: ButtonProps): JSX.Element => {
  const popupPayement = (): void => {
    onSelectEleve(eleve)
    const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null
    if (modal) {
      modal.showModal()
    } else {
      console.log('Modal element not found')
    }
  }

  const popupModify = (): void => {
    onSelectEleve(eleve)
    console.log('Modify')
  }

  const handleDelete = (): void => {
    onSelectEleve(eleve)
    console.log('Modify')
  }

  return (
    <div className="dropdown dropdown-right dropdown-end ">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-xs btn-outline bg-blue-600 border-none text-white  text-sm"
      >
        <LuPencilLine className="font-bold" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-white rounded-box z-[1] min-w-96 min-h-20 p-2 flex flex-row items-center justify-around shadow"
      >
        <li>
          <button
            onClick={popupPayement}
            className="btn btn-sm bg-green-500 border-none btn-outline text-black"
          >
            <GiPayMoney />
            <span>Payement</span>
          </button>
        </li>
        <li>
          <button
            onClick={popupModify}
            className="btn btn-sm bg-blue-500 border-none btn-outline text-black"
          >
            <MdMode />
            <span>Modifier</span>
          </button>
        </li>
        <li>
          <button
            onClick={handleDelete}
            className="btn btn-sm bg-red-500 border-none  btn-outline text-black"
          >
            <MdDeleteForever />
            <span>Suprimer</span>
          </button>
        </li>
      </ul>
    </div>
  )
}

export { Button }
