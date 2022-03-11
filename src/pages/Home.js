import React, { useEffect, useState } from 'react';

import { DESCRATCHOFF_ADDRESS, COVALENT_APIKEY } from '../config';
import ScratchCardsList from '../components/ScratchCardsList';

function Home({ walletAddress, DSOContract }) {
  const [scratchCards, setScratchCards] = useState([]);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');

  useEffect(() => {
    if(DSOContract) getScratchCard();
  }, [DSOContract])

  const getScratchCard = async () => {
    const nfts = await fetch(`https://api.covalenthq.com/v1/80001/tokens/${DESCRATCHOFF_ADDRESS}/nft_token_ids/?quote-currency=USD&format=JSON&key=${COVALENT_APIKEY}`);
    const { data } = await nfts.json();
    console.log(data);

    let cards = [];
    for(let i = 0; i < data.items.length; i++){
      const nft = await DSOContract.scratchCards(data.items[i].token_id);
      
      if(nft.owner == walletAddress){
        cards.push(nft);
      }
    }

    console.log(cards);
    setScratchCards(cards);
  }
  
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
      <hr />
      <h2>Your Digital scratch cards</h2>
      {scratchCards.length
        ? <ScratchCardsList scratchCards={scratchCards} />
        : <p className="text-danger">You do not have any digital scratch cards </p>
      }
    </div>
  )
}

export default Home;