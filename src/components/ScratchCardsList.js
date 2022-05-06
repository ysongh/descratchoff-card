import React from 'react';
import { Link } from 'react-router-dom';

function ScratchCardsList({ scratchCards }) {
  return (
    <div className="row">
      {scratchCards.map(card => (
        <div className="col-sm-12 col-md-4 col-lg-3 mb-3" key={card.id.toString()}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">NFT #{card.id.toString()}</h5>
              <p className="card-text">From Card #{card.artistCardId.toString()}</p>
              <p className="card-text">{card.isScratch ? "Already Used" : "Not Used"}</p>
              <Link to={`/scratch-card/${card.id.toString()}/${card.artistCardId.toString()}`} className="btn btn-primary btn-b">
                View
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ScratchCardsList;