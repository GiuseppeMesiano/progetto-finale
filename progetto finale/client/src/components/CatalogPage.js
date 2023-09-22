import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CatalogPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Effettua una richiesta GET per ottenere i prodotti dal server
    axios.get('/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Catalogo</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CatalogPage;
