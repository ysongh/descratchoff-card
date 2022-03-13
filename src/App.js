import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import ScratchCard from './pages/ScratchCard' ;
import YourCards from './pages/YourCards';
import CreateCard from './pages/CreateCard';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState(null);
  const [DSOContract, setDSOContract] = useState(null);

  return (
    <HashRouter>
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
        setProvider={setProvider}
        setDSOContract={setDSOContract} />
      <Routes>
        <Route
          path="/scratch-card/:id"
          element={
            <ScratchCard
              walletAddress={walletAddress}
              DSOContract={DSOContract} />} />
        <Route
          path="/create-card"
          element={
            <CreateCard
              provider={provider}
              DSOContract={DSOContract} />} />
        <Route
          path="/user-card"
          element={
            <YourCards
              walletAddress={walletAddress}
              DSOContract={DSOContract} />} />
        <Route
          path="/"
          element={
            <Home
              DSOContract={DSOContract} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
