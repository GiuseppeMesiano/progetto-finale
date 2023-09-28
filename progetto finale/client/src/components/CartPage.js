import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Funzione per recuperare i prodotti dall'API quando il componente si monta
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Errore nel recupero dei prodotti:', error);
      }
    }

    // Chiamata alla funzione per recuperare i prodotti
    fetchProducts();
  }, []);

  const remove = async (productId) => {
    try {
      // Effettua una richiesta POST per rimuovere un prodotto dal carrello
      const response = await axios.post('http://localhost:3001/api/remove', { productId });
      console.log('Prodotto rimosso dal carrello:', response.data);

      // Aggiorna la proprietà 'cart' del prodotto nello stato locale
      setProducts((prevProducts) => {
        return prevProducts.map((product) => {
          if (product._id === productId) {
            // Imposta 'cart' a true per indicare che il prodotto è nel carrello
            return { ...product, cart: true };
          }
          return product;
        });
      });
    } catch (error) {
      console.error('Errore nell\'aggiunta del prodotto al carrello:', error);
    }
  };

  // Filtra i prodotti in base alla proprietà 'cart'
  const cartProducts = products.filter((product) => product.cart === true);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Carrello</h2>
      <div className="grid grid-cols-3 gap-4">
        {Array.isArray(cartProducts) &&
          cartProducts.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow transition-transform transform hover:scale-105 hover:bg-gray-100">
              <img src={product.immagine} alt={product.nome} className="mb-2" />
              <h3 className="text-lg font-semibold">{product.nome}</h3>
              <p className="text-gray-600">Prezzo: ${product.prezzo}</p>
              <p className="text-gray-600">Quantità: {product.quantity}</p>
              <p className="text-gray-600">Descrizione: {product.desc}</p>
              
              <button
                onClick={() => remove(product._id)} 
                className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Rimuovi
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductList;
