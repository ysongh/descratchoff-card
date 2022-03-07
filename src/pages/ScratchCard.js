import React from 'react';

import Scratchoff from '../components/Scratchoff';

function ScratchCard() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <Scratchoff />
        </div>
        <div className="col-4">
          <Scratchoff />
        </div>
        <div className="col-4">
          <Scratchoff />
        </div>
      </div>
    </div>
  )
}

export default ScratchCard;