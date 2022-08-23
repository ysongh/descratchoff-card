import React, { useState } from 'react';

import { ButtonSpinner } from './Spinners';

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"

function ArtistCollectionsCard({ card, DSOContract }) {
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  
  const purchaseCard = async (cardId) => {
    try {
      setPurchaseLoading(true);

      const transaction = await DSOContract.buyScratchCard(cardId);
      const tx = await transaction.wait();

      console.log(tx);
      setTransactionHash(tx.transactionHash);
      setPurchaseLoading(false);
    } catch(error) {
      console.error(error);
      setPurchaseLoading(false);
    }
  }
  return (
    <div className="card">
      <img src={card.coverPhotoCid ?`https://ipfs.io/ipfs/${card.coverPhotoCid}` : DEFAULT_IMAGE} className="card-img-top" alt="Cover Photo" />
      <div className="card-body">
        <h5 className="card-title">Card #{card.id.toString()}</h5>
        <p className="card-text">
          <a href={`https://mumbai.polygonscan.com/address/${card.artist}`} target="_blank" rel="noopener noreferrer">
            {card.artist.substring(0,8) + "..." + card.artist.substring(34,42)}
          </a>
        </p>
        {purchaseLoading
          ? <ButtonSpinner />
          : <div className="d-grid gap-2">
              <button className="btn btn-primary" onClick={() => purchaseCard(card.id.toString())}>
                Purchase
              </button>
            </div>
        }
        {transactionHash &&
          <p className="text-success mt-3">
            Success, see transaction {" "}
            <a href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
              {transactionHash.substring(0, 10) + '...' + transactionHash.substring(56, 66)}
            </a>
          </p>
        }
      </div>
    </div>
  )
}

export default ArtistCollectionsCard;