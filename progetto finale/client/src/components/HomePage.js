import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Effettua una richiesta GET per ottenere i prodotti in primo piano dal server
    axios.get('http://localhost:3000/api/featured-products')
      .then((response) => {
        setFeaturedProducts(response.data);
      })
      .catch((error) => {
        console.error('Errore durante il recupero dei prodotti in primo piano:', error);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Tutto Sport
        </h1>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Scopri le nostre maglie sportive di alta qualità.
        </p>

        <h2 className="text-2xl font-semibold mb-6 text-center">Prodotti in Primo Piano</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
            >
              <img
                src={product.image} 
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-gray-700 mt-2">${product.price.toFixed(2)}</p>
                <div className="flex justify-center mt-4">
                  <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
                    Aggiungi al Carrello
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
