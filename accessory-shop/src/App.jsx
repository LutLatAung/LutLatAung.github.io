import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DataTable from './components/DataTable';
import productList from './accessory-products.json';
import { useLocalStorage } from 'react-use';
import { TotalPriceContext } from './context.jsx';


function App() {
  const productRef = useRef();
  const quantityRef = useRef();
  const [price, setPrice] = useState(productList[0].price);
  const [totalPrice, setTotalPrice] = useState(0);

  

  const [selectedItems, setSelectedItems, remove] = useLocalStorage('selectedItems', []);   
  const [filteredSelectedItems, setFilteredSelectedItems] = useState(selectedItems);
  const [sortOrder, setSortOrder] = useState(null); 

  const handleSelect = () => {
    const pid = parseInt(productRef.current.value);
    const product = productList.find(p => p.id === pid);
    setPrice(product.price);
  };

  const handleAdd = () => {
    const pid = parseInt(productRef.current.value);
    const product = productList.find(p => p.id === pid);
    const q = quantityRef.current.value;

    selectedItems.push({
      ...product,
      quantity: q,
    });

    setSelectedItems([...selectedItems]);
    setFilteredSelectedItems(null); 
  };

  const deleteItemByIndex = (index) => {
    selectedItems.splice(index, 1);
    setSelectedItems([...selectedItems]);
    setFilteredSelectedItems(null); 
  };

  const search = (keyword) => {
    const filtered = selectedItems.filter(item => item.name.includes(keyword));
    setFilteredSelectedItems(filtered);
  };

  const sortItems = (order) => {
    const itemsToSort = filteredSelectedItems !== null ? filteredSelectedItems : selectedItems;
    const sortedItems = [...itemsToSort].sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    if (filteredSelectedItems !== null) {
      setFilteredSelectedItems(sortedItems);
    } else {
      setSelectedItems(sortedItems);
    }
    setSortOrder(order); 
  };

  return (
    <TotalPriceContext.Provider value={{totalPrice, setTotalPrice}}>
      <Container>
        <Row>
          <Col xs={6}>
            <Form.Label htmlFor="inputProductName">Product Name</Form.Label>
            <Form.Select
              id="inputProductName"
              ref={productRef}
              onChange={handleSelect}
            >
              {productList.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </Form.Select>

            <Form.Label htmlFor="inputPrice">Price</Form.Label>
            <Form.Control
              type="number"
              id="inputPrice"
              readOnly
              value={price}
            />

            <Form.Label htmlFor="inputQuantity">Quantity</Form.Label>
            <Form.Control
              type="number"
              id="inputQuantity"
              aria-describedby="Quantity"
              defaultValue={1}
              ref={quantityRef}
            />

            <Button variant="success" onClick={handleAdd}>
              Add
            </Button>
          </Col>
          <Col>
            <DataTable
              data={filteredSelectedItems !== null ? filteredSelectedItems : selectedItems}
              onDelete={deleteItemByIndex}
              onSearch={search}
              onSort={sortItems} 
            />
          </Col>
        </Row>
      </Container>
      <h1>Total Price is = {totalPrice.toFixed(2)}</h1>
    </TotalPriceContext.Provider>
  );
}

export default App;