import React, { useEffect, useState } from 'react';

import ScratchCardsList from '../components/ScratchCardsList';
import { BorderSpinner } from '../components/Spinners';

function YourCards({ walletAddress, DSOContract }) {
  const [scratchCards, setScratchCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(DSOContract) getScratchCard();
  }, [DSOContract])

  const getScratchCard = async () => {
    try {
      setLoading(true);
      // const nfts = await fetch(`https://api.covalenthq.com/v1/80001/tokens/${DESCRATCHOFF_ADDRESS}/nft_token_ids/?quote-currency=USD&format=JSON&key=${COVALENT_APIKEY}`);
      // const { data } = await nfts.json();
      
      const totalCards = await DSOContract.scratchCardSupply();
      console.log(+totalCards.toString());

      let cards = [];
      for(let i = 1; i <= +totalCards.toString(); i++){
        const nft = await DSOContract.scratchCards(i);
        
        if(nft.owner == walletAddress){
          cards.push(nft);
        }
      }

      console.log(cards);
      setScratchCards(cards);
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div className='container'>
      <h2 className='mt-3 mb-3'>Your Digital scratch cards</h2>
      {!loading
        ? <BorderSpinner />
        : scratchCards.length
          ? <ScratchCardsList scratchCards={scratchCards} />
          : <p className="text-danger">You do not have any digital scratch cards </p>
      }
    </div>
  )
}

export default YourCards;