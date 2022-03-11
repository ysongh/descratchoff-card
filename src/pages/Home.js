import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home({ DSOContract }) {
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');

  const purchaseCard = async () => {
    try {
      setPurchaseLoading(true);

      const transaction = await DSOContract.buyScratchCard();
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
    <div className="container">
      <h1 className="mt-3">
        Try your luck
      </h1>
      <p>
        Purchase a Digital scratch card for a chance to win something
      </p>
      {purchaseLoading
        ? <p>Loading...</p>
        : <button className="btn btn-primary" onClick={purchaseCard}>
            Purchase
          </button>
      }
      {transactionHash &&
        <p className="text-success">
          Success, see transaction {" "}
          <a href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
            {transactionHash.substring(0, 10) + '...' + transactionHash.substring(56, 66)}
          </a>
        </p>
      }
    </div>
  )
}

export default Home;