import { IoHome } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface ClasseProps {
  classe: string
  onClasseChange?: (nouvelleClasse: string) => void
}
const NavBarClass = ({ classe, onClasseChange }: ClasseProps): JSX.Element => {
  const navigate = useNavigate()
  const returnHomeClick = () => {
    navigate('/')
  }

  const location = useLocation()
  const [data, setData] = useState<string>(classe)

  const openModal = () => {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null
    if (modal) {
      modal.showModal()
    }
  }

  const closeModal = () => {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null
    if (modal) {
      modal.close()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nouvelleClasse = event.target.value
    setData(nouvelleClasse)
    if (onClasseChange) {
      onClasseChange(nouvelleClasse)
    }
  }

  useEffect(() => {
    const state = location.state
    if (state) {
      setData(state.classe)
    }
  }, [location])

  return (
    <div className="flex w-full mb-3">
      <div className="navbar bg-base-100 rounded-lg font-bold">
        <div className="flex-1">
          <button
            className="btn btn-ghost text-xl flex items-center justify-center"
            onClick={returnHomeClick}
          >
            <IoHome />
            <span className="mt-1">HOME</span>
          </button>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 z-10 flex gap-5 justify-center items-center">
            <li>
              <button onClick={openModal}>Inscription</button>
            </li>
            <li>
              <div className="flex items-center gap-2 p-2">
                <label>Classe:</label>
                <select
                  name="classe"
                  value={data}
                  onChange={handleChange}
                  className={`select w-full max-w-xs`}
                >
                  <option className="text-lg font-bold">CI-A</option>
                  <option className="text-lg font-bold">CI-B</option>
                  <option className="text-lg font-bold">CP-A</option>
                  <option className="text-lg font-bold">CP-B</option>
                  <option className="text-lg font-bold">CE1-A</option>
                  <option className="text-lg font-bold">CE1-B</option>
                  <option className="text-lg font-bold">CE2-A</option>
                  <option className="text-lg font-bold">CE2-B</option>
                  <option className="text-lg font-bold">CM1-A</option>
                  <option className="text-lg font-bold">CM1-B</option>
                  <option className="text-lg font-bold">CM2-A</option>
                  <option className="text-lg font-bold">CM2-B</option>
                </select>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { NavBarClass }
