import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [vat, setVat] = useState(0)


  function handle(e) {
    let p = e.target.value
    console.log(p)
    let v = p * 0.07
    setVat(v.toFixed(2))

  }

  return (
    <>

    <p style={{fontSize: '30pt'}}>Price:
      <input type="number"
      style={{fontSize: '30pt'}}
      onChange={handle} />  
    </p>
    

      
    <h1>VAT = {vat}</h1>
    </>
  )
}

export default App
