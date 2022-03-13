import React, { useEffect, useState } from 'react';

import { DESCRATCHOFF_ADDRESS, COVALENT_APIKEY } from '../config';
import ScratchCardsList from '../components/ScratchCardsList';

function YourCards({ walletAddress, DSOContract }) {
  const [scratchCards, setScratchCards] = useState([]);

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

  return (
    <div className='container'>
      <h2 className='mt-3 mb-3'>Your Digital scratch cards</h2>
      {scratchCards.length
        ? <ScratchCardsList scratchCards={scratchCards} />
        : <p className="text-danger">You do not have any digital scratch cards </p>
      }
    </div>
  )
}

export default YourCards;