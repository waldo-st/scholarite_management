import { NavbarHome } from '@renderer/components/NavBarHome'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const [selectedClass, setSelectedClass] = useState<string>('CI-A')
  // Gérer le changement de classe
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value)
  }
  const handleClick = async () => {
    navigate('/classe', {
      state: {
        classe: selectedClass
      }
    })
  }

  return (
    <div className="flex flex-col w-full h-full">
      <NavbarHome />
      <div className="w-full flex flex-col items-center gap-5">
        <div className="text-black w-96 h-52 flex flex-col justify-around items-center shadow-2xl rounded-md">
          <div className=" text-4xl font-bold text-start">GESTION</div>
          <div className="text-5xl font-extrabold">SCOLARITES</div>
          <div className="flex justify-center items-center text-3xl font-serif">
            <div>Classe:</div>
            <select
              className="select select-bordered bg-slate-50 w-32 max-w-xs text-lg font-bold"
              value={selectedClass}
              onChange={handleClassChange}
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
        </div>
        <div>
          <button
            className="btn btn-sm sm:btn-sm md:btn-md lg:btn-lg text-white font-bold"
            onClick={handleClick}
          >
            ENTRER
          </button>
        </div>
      </div>
    </div>
  )
}

export { Home }
