import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="alert alert-info alert-dismissible fade show" role="alert">
        <div className='container'>
          <strong>Contract is deployed on Polygon Test Network</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
      <header>
        <div className="container">
          <div className="row py-5">
            <div className="col-12 col-md-6 mb-5">
              <h1 className="mt-4 mb-4">Digital Scratch Card</h1>
              <p className="mb-4">Try your luck and match 3 to win.  Verifiable Random with Chainlink VRF</p>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/scratchcardlist')}>
                Get Started
              </button>
            </div>

            <div className="col-12 col-md-6">
              <img
                className="img-fluid"
                src="/hero-img.jpeg"
                alt="Hero" />
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Home;