import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import ScratchCard from './pages/ScratchCard' ;

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [DSOContract, setDSOContract] = useState(null);

  return (
    <div>
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
        setDSOContract={setDSOContract} />
      <HashRouter>
        <Routes>
          <Route
            path="/scratch-card"
            element={
              <ScratchCard />} />
          <Route
            path="/"
            element={
              <Home
                walletAddress={walletAddress}
                DSOContract={DSOContract} />} />
        </Routes>
      </HashRouter>
      
    </div>
  );
}

export default App;
