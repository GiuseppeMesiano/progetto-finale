import React, { useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  // Definiamo uno stato per il prodotto con valori iniziali vuoti
  const [product, setProduct] = useState({
    nome: '',
    prezzo: '',
    immagine: '',
    desc: '',
    cart: false,
    quantity: 0,
    category: '',
  });

  // Funzione per gestire il cambiamento dei campi del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Aggiorniamo lo stato del prodotto con il nuovo valore
    setProduct({ ...product, [name]: value });
  };

  // Funzione per gestire l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Richiesta POST al server per aggiungere il prodotto
      const response = await axios.post('http://localhost:3001/api/products', product);

      console.log('Prodotto aggiunto con successo:', response.data);

      // Resetto lo stato del prodotto dopo l'aggiunta
      setProduct({
        nome: '',
        prezzo: '',
        immagine: '',
        desc: '',
        cart: false,
        quantity: '',
        category: '',
      });
    } catch (error) {
      console.error('Errore durante l\'aggiunta del prodotto:', error);
    }
  };



  return (

    <div>

      <h2 className="text-2xl font-semibold mb-4">Pannello di Amministrazione</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">



        <div className="mb-4">

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">

            Nome del Prodotto

          </label>

          <input

            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            type="text"

            placeholder="Nome del Prodotto"

            name="nome"

            value={product.nome}

            onChange={handleChange}

            required

          />

        </div>



        <div className="mb-4">

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prezzo">

            Prezzo

          </label>

          <input

            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            type="number"

            placeholder="Prezzo"

            name="prezzo"

            value={product.prezzo}

            onChange={handleChange}

            required

          />

        </div>



        <div className="mb-4">

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">

            Descrizione

          </label>

          <input

            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            type="number"

            placeholder="desc"

            name="desc"

            value={product.desc}

            onChange={handleChange}

            required

          />

        </div>



        <div className="mb-4">

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="immagine">

            Immagine

          </label>

          <input

            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            type="text"

            placeholder="Immagine"

            name="immagine"

            value={product.immagine}

            onChange={handleChange}

            required

          />

        </div>





        <div className="mb-4">

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">

            categoria

          </label>

          <input

            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            type="text"

            placeholder="category"

            name="category"

            value={product.category}

            onChange={handleChange}

            required

          />

        </div>

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