import { useState } from 'react'
import './App.css'

function App() {
  const [vat, setVat] = useState(0)
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)

  function handlePriceChange(e) {
    const p = parseFloat(e.target.value) || 0
    setPrice(p)
    calculateVat(p, discount)
  }

  function handleDiscountChange(e) {
    const d = parseFloat(e.target.value) || 0
    setDiscount(d)
    calculateVat(price, d)
  }

  function calculateVat(price, discount) {
    const v = (price - discount) * 0.07
    setVat(v.toFixed(2))
  }

  return (
    <>
    
    <p style={{fontSize: '30pt'}}>Price:
    <input type="number"
      style={{fontSize: '30pt'}}
      name="Price"
      onChange={handlePriceChange} />  
  </p>

  <p style={{fontSize: '30pt'}}>Discount:
    <input type="number"
      style={{fontSize: '30pt'}}
      name="Discount"
      onChange={handleDiscountChange} />  
  </p>

      <h1>VAT = {vat}</h1>
    </>
  )
}

export default App
