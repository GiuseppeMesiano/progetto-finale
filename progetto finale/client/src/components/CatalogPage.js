import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  // Stato per memorizzare la lista di prodotti
  const [products, setProducts] = useState([]);
  // Stato per memorizzare la categoria selezionata
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  // Funzione per aggiungere un prodotto al carrello
  const addToCart = async (productId) => {
    try {
      const response = await axios.post('http://localhost:3001/api/add', { productId });
      console.log('Prodotto aggiunto al carrello:', response.data);
    } catch (error) {
      console.error('Errore nell\'aggiunta del prodotto al carrello:', error);
    }
  };

  // Funzione per filtrare i prodotti per categoria
  function filter(category) {
    setSelectedCategory(category);
  }

  return (
    <div>
      {/* Pulsanti per filtrare per categoria */}
      <div className="flex justify-center space-x-4 mb-4">
        <button className="bg-orange-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => filter('basket')}>
          Basket
        </button>
        <button className="bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => filter('calcio')}>
          Calcio
        </button>
        <button className="bg-red-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => filter('golf')}>
          Golf
        </button>
        <button className="bg-yellow-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => filter('tennis')}>
          Tennis
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Prodotti</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* Mappa dei prodotti filtrati */}
        {Array.isArray(products) &&
          products
            .filter((product) => {
              // Se non è stata selezionata una categoria, mostra tutti i prodotti
              if (!selectedCategory) return true;
              // Filtra i prodotti in base alla categoria selezionata
              return product.category === selectedCategory;
            })
            .map((product) => (
              <div key={product._id} className="border p-4 rounded shadow transition-transform transform hover:scale-105 hover:bg-gray-100">
                <img src={product.immagine} alt={product.nome} className="mb-2" />
                <h3 className="text-lg font-semibold">{product.nome}</h3>
                <p className="text-gray-600">Prezzo: ${product.prezzo}</p>
                <p className="text-gray-600">Descrizione: {product.desc}</p>
                <p className="text-gray-600">Categoria: {product.category}</p>
                {/* Pulsante per aggiungere il prodotto al carrello */}
                <button onClick={() => addToCart(product._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                  Aggiungi al Carrello
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}

export default ProductList;
