import React, { useEffect, useState } from 'react';

import ArtistCollectionsList from '../components/ArtistCollectionsList';

function Home({ DSOContract }) {
  const [artistCards, setArtistCards] = useState([]);

  useEffect(() => {
    if(DSOContract) getArtistCards();
  }, [DSOContract])

  const getArtistCards = async () => {
    let count = await DSOContract.artistCardTotal();
    count = count.toString();
    console.log(count);

    let cards = [];
    for(let i = 1; i <= count; i++){
      const collection = await DSOContract.artistCards(i);
      cards.push(collection);
    }

    console.log(cards);
    setArtistCards(cards);
  }

  return (
    <div className="container">
      <div className="alert alert-info alert-dismissible fade show" role="alert">
        <strong>Contract is deployed on Polygon Test Network</strong>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <h1 className="mt-3">
        Try your luck
      </h1>
      <p>
        Purchase a Digital scratch card for a chance to win something
      </p>

      {!DSOContract && <p className="text-danger">Please connect to your wallet</p>}

      <ArtistCollectionsList
        artistCards={artistCards}
        DSOContract={DSOContract}/>
    </div>
  )
}

export default Home;