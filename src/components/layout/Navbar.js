import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import UAuth from '@uauth/js';
import Web3Modal from 'web3modal';

import { DESCRATCHOFF_ADDRESS, BICONOMY_APIKEY, UNSTOPPABLEDOMAINS_CLIENTID, UNSTOPPABLEDOMAINS_REDIRECT_URI } from '../../config';
import DeScratchOff from '../../artifacts/contracts/DeScratchOff.sol/DeScratchOff.json';

let Biconomy = window.Biconomy;

const uauth = new UAuth({
  clientID: UNSTOPPABLEDOMAINS_CLIENTID,
  redirectUri: UNSTOPPABLEDOMAINS_REDIRECT_URI,
});

function Navbar({ walletAddress, domainData, setDomainData, maticBalance, setmaticBalance, setWalletAddress, setProvider, setDSOContract, setglDSOContract }) {
  const nagivate = useNavigate();

  useEffect(() => {
    uauth
      .user()
      .then(userData => {
        console.log(userData);
        setDomainData(userData);
      })
      .catch(error => {
        console.error('profile error:', error);
      })
  }, [])

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);  
    console.log(provider);

    const biconomy = new Biconomy(provider,{apiKey: BICONOMY_APIKEY, debug: true});
    let ethersProvider = new ethers.providers.Web3Provider(biconomy);
    console.log(ethersProvider);
    setProvider(ethersProvider);

    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address);
    const glSigner = ethersProvider.getSigner();

    const balance = await provider.getBalance(address);
    setmaticBalance(balance)

    let contract = new ethers.Contract(DESCRATCHOFF_ADDRESS, DeScratchOff.abi, signer);
    setDSOContract(contract);

    let glcontract = new ethers.Contract(DESCRATCHOFF_ADDRESS, DeScratchOff.abi, glSigner);
    setglDSOContract(glcontract);
  }

  const loginWithUnstoppableDomains = async () => {
    try {
      const authorization = await uauth.loginWithPopup();
      authorization.sub = authorization.idToken.sub;
      console.log(authorization);
      setDomainData(authorization);
      nagivate('./user-card');
    } catch (error) {
      console.error(error);
    }
  }

  const logoutFromUnstoppableDomains = async () => {
    try {
      await uauth.logout();

      setDomainData(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="./logo.png" alt="logo" style={{ width: '80px' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/scratchcardlist">Card List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/create-card">Create Card</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/user-card">Your Cards</Link>
            </li>
          </ul>
          {maticBalance &&  <h5><span className="badge bg-primary mt-2 me-3">{+parseFloat(maticBalance / 10 ** 18).toFixed(3)} MATIC</span></h5>}
          {domainData
            ? <>
                <h5 className='mt-2'><span className="badge bg-primary">{domainData?.sub}</span></h5>
                  <button className="btn btn-danger btn-sm ms-2" onClick={logoutFromUnstoppableDomains}>
                    Logout
                  </button>
                </>
            : walletAddress
              ? <h5 className='mt-2'><span className="badge bg-primary">{walletAddress.substring(0,8) + "..." + walletAddress.substring(34,42)}</span></h5>
              : <>
                  <button className="btn btn-outline-primary me-2" type="submit"  onClick={loginWithUnstoppableDomains}>
                    Login with Unstoppable
                  </button>
                  <button className="btn btn-outline-success" type="submit"  onClick={connectWallet}>
                    Connect to Wallet
                  </button>
                </>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar;