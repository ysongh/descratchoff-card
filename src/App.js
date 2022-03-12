import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import ScratchCard from './pages/ScratchCard' ;
import CreateCard from './pages/CreateCard';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [DSOContract, setDSOContract] = useState(null);

  return (
    <HashRouter>
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
        setDSOContract={setDSOContract} />
      <Routes>
        <Route
          path="/scratch-card/:id"
          element={
            <ScratchCard
              DSOContract={DSOContract} />} />
        <Route
          path="/create-card"
          element={
            <CreateCard
              DSOContract={DSOContract} />} />
        <Route
          path="/"
          element={
            <Home
              walletAddress={walletAddress}
              DSOContract={DSOContract} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
