function NavbarHome() {
  return (
    <div className="w-full h-64 bg-transparent flex flex-col p-5 justify-between items-center">
      <div className="w-full flex justify-between">
        <div className="w-48 h-32">
          <img src="src/assets/ds.jpg" alt="" className="h-full w-full" />
        </div>
        <div className="w-44 h-36">
          <img src="src/assets/Logo.png" alt="" className="w-full h-full" />
        </div>
        <div className="w-48 h-32">
          <img src="src/assets/R.png" alt="" className="w-full h-full" />
        </div>
      </div>
      <div className="w-full h-9 bg-blue-700 flex justify-center items-center font-bold">
        <span>ECOLE: DILIGENT</span>
      </div>
    </div>
  )
}

export { NavbarHome }
