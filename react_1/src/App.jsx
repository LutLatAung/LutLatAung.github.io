import { useState } from 'react'
import './App.css'

function App() {
  const [vat, setVat] = useState(0)

  function handle(e) {
    let p = e.target.value
    let discount = document.getElementById('discount').value
    let v = (p - discount) * 0.07
    setVat(v.toFixed(2))
  }

  return (
    <>
      <p style={{fontSize: '30pt'}}>Price:
        <input type="number"
          style={{fontSize: '30pt'}}
          onChange={handle} />  
      </p>

      <p style={{fontSize: '30pt'}}>Discount:
        <input id="discount" type="number"
          style={{fontSize: '30pt'}}
          onChange={handle} />  
      </p>

      <h1>VAT = {vat}</h1>
    </>
  )
}

export default App
