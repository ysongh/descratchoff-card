import React from 'react';

import ArtistCollectionsCard from './ArtistCollectionsCard';

function ArtistCollectionsList({ artistCards, DSOContract }) {
  return (
    <div className="row">
      {artistCards.map(card => (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={card.id.toString()}>
          <ArtistCollectionsCard
            card={card}
            DSOContract={DSOContract} />
        </div>
      ))}
    </div>
  )
}

export default ArtistCollectionsList;