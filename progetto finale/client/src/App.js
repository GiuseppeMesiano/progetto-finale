import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Aggiungi 'Routes' qui
import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import CartPage from './components/CartPage';
import AdminPanel from './components/AdminPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faBasketballBall, faGolfBall, faTennisBall } from '@fortawesome/free-solid-svg-icons';


function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-white text-4xl font-bold animate-pulse">
          Tutto <span className="text-yellow-300">Sport</span>
        </h1>
        <div>
        <FontAwesomeIcon icon={faFutbol} size="2x" /> {/* Icona di calcio */}
          <FontAwesomeIcon icon={faBasketballBall} size="2x" /> {/* Icona di basket */}
          <FontAwesomeIcon icon={faGolfBall} size="2x" /> {/* Icona di golf */}
          
        </div>
        <ul className="flex space-x-4 text-white">
          <li>
            <Link to="/" className="transition duration-300 hover:text-yellow-300 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/catalog" className="transition duration-300 hover:text-yellow-300 hover:underline">
              Catalogo
            </Link>
          </li>
          <li>
            <Link to="/cart" className="transition duration-300 hover:text-yellow-300 hover:underline">
              Carrello
            </Link>
          </li>
          <li>
            <Link to="/admin" className="transition duration-300 hover:text-yellow-300 hover:underline">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>

        {/* Rotte per le diverse pagine */}
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-200 p-4">
          <div className="container mx-auto text-center">
            &copy; {new Date().getFullYear()} Tutto Sport Tutti i diritti riservati.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
