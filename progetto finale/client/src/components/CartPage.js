import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Effettua una richiesta GET per ottenere il carrello dell'utente
    axios.get('/api/cart')
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Carrello</h2>
      {cart.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - Quantità: {item.quantity} - Prezzo: ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;
