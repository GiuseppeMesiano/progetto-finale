const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3001;

// middleware CORS 
app.use(cors());

// Utilizza il middleware per il parsing dei dati in formato JSON
app.use(bodyParser.json());

// Gestisce la richiesta di inserimento di nuovi prodotti nel database
app.post('/api/products', (req, res) => {
   fs.readFile('api/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Errore nella lettura del file:', err);
      return res.status(500).send('Errore del Server Interno');
    }

    try {
      const jsonData = JSON.parse(data);
      const newProduct = {
        _id: jsonData.featuredProducts.length + 1,
        ...req.body,
      };

      jsonData.featuredProducts.push(newProduct);

      const updatedData = JSON.stringify(jsonData, null, 2);

      fs.writeFile('api/db.json', updatedData, 'utf8', (err) => {
        if (err) {
          console.error('Errore nella scrittura del file:', err);
          return res.status(500).send('Errore del Server Interno');
        }
        console.log('Nuovo prodotto aggiunto con successo.');
        res.json(newProduct);
      });
    } catch (error) {
      console.error('Errore nel parsing JSON:', error);
      res.status(500).send('Errore del Server Interno');
    }
  });
});

// Gestisce la richiesta di recupero dei prodotti dal database
app.get('/api/products', (req, res) => {
  fs.readFile('api/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Errore nella lettura del file:', err);
      return res.status(500).send('Errore del Server Interno');
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData.featuredProducts);
    } catch (error) {
      console.error('Errore nel parsing JSON:', error);
      res.status(500).send('Errore del Server Interno');
    }
  });
});

// Gestisce la richiesta di aggiunta di prodotti al carrello
app.post('/api/add', (req, res) => {
  const { productId } = req.body;

  fs.readFile('api/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Errore nella lettura del file:', err);
      return res.status(500).send('Errore del Server Interno');
    }

    try {
      const jsonData = JSON.parse(data);
      const product = jsonData.featuredProducts.find((p) => p._id === productId);

      if (!product) {
        return res.status(404).send('Prodotto non trovato');
      }

      // Imposta la proprietà 'cart' a true e aumenta la quantità
      product.cart = true;
      product.quantity++;

      const updatedData = JSON.stringify(jsonData, null, 2);

      fs.writeFile('api/db.json', updatedData, 'utf8', (err) => {
        if (err) {
          console.error('Errore nella scrittura del file:', err);
          return res.status(500).send('Errore del Server Interno');
        }
        console.log('Prodotto aggiunto al carrello con successo.');
        res.json(product);
      });
    } catch (error) {
      console.error('Errore nel parsing JSON:', error);
      res.status(500).send('Errore del Server Interno');
    }
  });
});

// Gestisce la richiesta di rimozione dei prodotti dal carrello
app.post('/api/remove', (req, res) => {
  const { productId } = req.body;

  fs.readFile('api/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Errore nella lettura del file:', err);
      return res.status(500).send('Errore del Server Interno');
    }

    try {
      const jsonData = JSON.parse(data);
      const product = jsonData.featuredProducts.find((p) => p._id === productId);

      if (!product) {
        return res.status(404).send('Prodotto non trovato');
      }

      // Imposta la proprietà 'cart' a false e diminuisce la quantità
      if (product.quantity > 1) {
        product.quantity--;
      } else if (product.quantity === 1) {
        product.cart = false;
      }

      const updatedData = JSON.stringify(jsonData, null, 2);

      fs.writeFile('api/db.json', updatedData, 'utf8', (err) => {
        if (err) {
          console.error('Errore nella scrittura del file:', err);
          return res.status(500).send('Errore del Server Interno');
        }
        console.log('Prodotto rimosso dal carrello con successo.');
        res.json(product);
      });
    } catch (error) {
      console.error('Errore nel parsing JSON:', error);
      res.status(500).send('Errore del Server Interno');
    }
  });
});

// Avvia il server 
app.listen(PORT, () => {
  console.log(`Il server è in esecuzione su http://localhost:${PORT}`);
});
