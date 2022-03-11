import React, { useState } from 'react';

import './App.css';
import Navbar from './components/layout/Navbar';
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
      <ScratchCard />
    </div>
  );
}

export default App;
