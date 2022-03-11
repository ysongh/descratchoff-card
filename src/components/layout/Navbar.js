import React from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import DeScratchOff from '../../artifacts/contracts/DeScratchOff.sol/DeScratchOff.json';

const DESCRATCHOFF_ADDRESS = "0xfDf46F470b85F5ab708e2cFb2Ca48f1bF1f54a8B";

function Navbar({ walletAddress, setWalletAddress, setDSOContract }) {
  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);  
    console.log(provider);

    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address);

    let contract = new ethers.Contract(DESCRATCHOFF_ADDRESS, DeScratchOff.abi, signer);
    setDSOContract(contract);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">DeScratchOff Card</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">Home</a>
            </li>
          </ul>
          <button className="btn btn-outline-success" type="submit"  onClick={connectWallet}>
            {walletAddress ? walletAddress.substring(0,8) + "..." + walletAddress.substring(34,42) : "Connect to Wallet"}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;