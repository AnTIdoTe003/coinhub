import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoinDetails from './components/CoinDetails';
import Coins from './components/Coins';
import Exchanges from './components/Exchanges';
import Header from './components/Header';
import Home from './components/Home';


function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/coins" element={<Coins></Coins>}/>
        <Route path="/exchanges" element={<Exchanges></Exchanges>}/>
        <Route path="/coin/:id" element={<CoinDetails></CoinDetails>}/>
      </Routes>
    </Router>
  );
}

export default App;
