import React from 'react';

function ArtistCollectionsList({ artistCards, purchaseCard, purchaseLoading }) {
  return (
    <div className="row">
      {artistCards.map(card => (
        <div className="col-sm-12 col-md-4 col-lg-3 mb-3" key={card.id.toString()}>
          <div className="card">
            <img src={`https://ipfs.io/ipfs/${card.coverPhotoCid}`} className="card-img-top" alt="Cover Photo" />
            <div className="card-body">
              <h5 className="card-title">Card #{card.id.toString()}</h5>
              <p className="card-text">
                {card.artist.substring(0,5) + "..." + card.artist.substring(37,42)}
              </p>
              {purchaseLoading
                ? <p>Loading...</p>
                : <button className="btn btn-primary" onClick={() => purchaseCard(card.id.toString())}>
                    Purchase
                  </button>
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArtistCollectionsList;