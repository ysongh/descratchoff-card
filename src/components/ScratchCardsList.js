import React from 'react';
import { Link } from 'react-router-dom';

function ScratchCardsList({ scratchCards }) {
  return (
    <div className="row">
      {scratchCards.map(card => (
        <div className="col-4" key={card.id.toString()}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card #{card.id.toString()}</h5>
              <p className="card-text">{card.isScratch ? "Already Used" : "Not Used"}</p>
              <Link to="/scratch-card" className="btn btn-primary btn-b">
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