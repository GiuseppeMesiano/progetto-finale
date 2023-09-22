import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Aggiungi 'Routes' qui
import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import AdminPanel from './components/AdminPanel';


function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-white text-2xl font-semibold">Nostro E-commerce</h1>
            <ul className="flex space-x-4 text-white">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/catalog">Catalogo</Link></li>
              <li><Link to="/cart">Carrello</Link></li>
              <li><Link to="/admin">Admin</Link></li>
              
            </ul>
          </div>
        </nav>

        {/* Rotte per le diverse pagine */}
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-200 p-4">
          <div className="container mx-auto text-center">
            &copy; {new Date().getFullYear()} Nostro E-commerce. Tutti i diritti riservati.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
