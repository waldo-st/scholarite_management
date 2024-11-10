import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Classe } from './pages/Classe'
import { Home } from './pages/Home'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="flex h-full justify-center bg-transparent">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classe" element={<Classe />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
