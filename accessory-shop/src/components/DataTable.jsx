import React, { useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { TotalPriceContext } from '../context.jsx';

const DataTable = ({ data, onDelete, onSearch, onSort }) => {
  const { totalPrice, setTotalPrice } = React.useContext(TotalPriceContext)
    let sum = 0

  useEffect(() => {
    if (data)
        sum = data.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setTotalPrice(sum)
})

  const sRef = useRef();

  const handleDelete = (index) => {
    onDelete(index);
  };

  const handleSearch = () => {
    const keyword = sRef.current.value;
    onSearch(keyword);
  };

  return (
    <Container>
      <input type="text" placeholder="Search..." ref={sRef} />{' '}
      <Button onClick={handleSearch}>Search</Button>
      <div>
        <Button onClick={() => onSort('asc')}>Sort Ascending</Button>
        <Button onClick={() => onSort('desc')}>Sort Descending</Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <i className="bi bi-trash" onClick={() => handleDelete(index)}> </i>
              </td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default DataTable;
