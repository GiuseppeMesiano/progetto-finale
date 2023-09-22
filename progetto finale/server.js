const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;


mongoose.connect('mongodb://localhost:27017/progetto-finale', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
});


const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/api/products', async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
    });

    
    await newProduct.save();

    
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Errore durante l\'inserimento del prodotto:', error);
    res.status(500).json({ error: 'Errore durante l\'inserimento del prodotto' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
