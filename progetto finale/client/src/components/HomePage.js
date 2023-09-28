import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  // Stato per memorizzare la lista di prodotti
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Funzione per recuperare i prodotti dall'API quando il componente si monta
    async function fetchProducts() {
      try {
        // Effettua una richiesta GET all'API per ottenere i prodotti
        const response = await axios.get('http://localhost:3001/api/products');
        // Imposta lo stato con i dati dei prodotti ottenuti dalla chiamata API
        setProducts(response.data);
      } catch (error) {
        // Gestisce gli errori nel caso in cui la richiesta all'API fallisca
        console.error('Errore nel recupero dei prodotti:', error);
      }
    }

    // Chiamata alla funzione per recuperare i prodotti quando il componente si monta
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Prodotti in evidenza</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Mappa dei prodotti ottenuti dalla chiamata API e li visualizza */}
        {Array.isArray(products) &&
          products.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow transition-transform transform hover:scale-105 hover:bg-gray-100">
              <p>{product._id}</p>
              <h3 className="text-lg font-semibold">{product.nome}</h3>
              <img src={product.immagine} alt={product.nome} className="mb-2" />
              <p className="text-gray-600">Prezzo: ${product.prezzo}</p>
              <p className="text-gray-600">Descrizione: {product.desc}</p>
              <p className="text-gray-600">Categoria: {product.category}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductList;
