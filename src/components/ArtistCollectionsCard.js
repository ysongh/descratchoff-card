import React, { useState } from 'react';

import { ButtonSpinner } from './Spinners';

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
      <img src={`https://ipfs.io/ipfs/${card.coverPhotoCid}`} className="card-img-top" alt="Cover Photo" />
      <div className="card-body">
        <h5 className="card-title">Card #{card.id.toString()}</h5>
        <p className="card-text">
          <a href={`https://mumbai.polygonscan.com/address/${card.artist}`} target="_blank" rel="noopener noreferrer">
            {card.artist.substring(0,8) + "..." + card.artist.substring(34,42)}
          </a>
        </p>
        {purchaseLoading
          ? <ButtonSpinner />
          : <button className="btn btn-primary" onClick={() => purchaseCard(card.id.toString())}>
              Purchase
            </button>
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