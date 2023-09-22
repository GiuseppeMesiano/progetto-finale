import React, { useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('/api/products', product);

    
      console.log('Prodotto aggiunto con successo:', response.data);
      setProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
      });
    } catch (error) {
      console.error('Errore durante l\'aggiunta del prodotto:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Pannello di Amministrazione</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Nome del Prodotto */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nome del Prodotto
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Nome del Prodotto"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Descrizione */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Descrizione
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Descrizione"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Prezzo */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Prezzo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Prezzo"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Categoria */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Categoria
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Seleziona una categoria</option>
            {/* Aggiungi le opzioni della categoria qui */}
          </select>
        </div>

        {/* Immagine (URL) */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Immagine (URL)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="URL dell'Immagine"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>

        {/* Pulsante di invio */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Aggiungi Prodotto
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminPanel;
