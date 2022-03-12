import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Scratchoff from '../components/Scratchoff';

const images = [
  "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2hhcGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1551907234-4f794b152738?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHNoYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1506463108611-88834e9f6169?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHNoYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1524169113253-c6ba17f68498?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHNoYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1533903237682-b47efb7ebffd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHNoYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1540760938999-077b8231d890?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fHNoYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1509266044497-ed3d3ab3471e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njd8fHNoYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1541580104-94e138c83ca9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHNoYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1532360819424-7f622340cff2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTN8fHNoYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1514351630998-ad9175c7791d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTR8fHNoYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
]

function ScratchCard({ DSOContract }) {
  const { id } = useParams();

  const [showCard, setShowCard] = useState(false);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    if(DSOContract) getScratchCard();
  }, [DSOContract])

  useEffect(() => {
    if(DSOContract) getNumbers();
  }, [showCard])
  

  const getScratchCard = async () => {
    const nft = await DSOContract.scratchCards(id);
    console.log(nft);
    setShowCard(nft.isScratch);
  }

  const getNumbers = async () => {
    const randNumbers = await DSOContract.getNumbersByScratchCard(id);
    console.log(randNumbers);
    setNumbers(randNumbers);
  }

  const redeemCard = async () => {
    try {
      const transaction = await DSOContract.fillScratchCard(id);
      const tx = await transaction.wait();

      console.log(tx);
      setShowCard(true);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      {showCard
        ?  <>
        <div className="row">
            <div className="col-4">
              <Scratchoff image={numbers[0] && images[numbers[0].toString()]} />
            </div>
            <div className="col-4">
              <Scratchoff image={numbers[1] && images[numbers[1].toString()]} />
            </div>
            <div className="col-4">
              <Scratchoff image={numbers[2] && images[numbers[2].toString()]} />
            </div>
          </div>
          <div className="row" style={{ marginTop: '15rem'}}>
            <div className="col-4">
              <Scratchoff image={numbers[3] && images[numbers[3].toString()]} />
            </div>
            <div className="col-4">
              <Scratchoff image={numbers[4] && images[numbers[4].toString()]} />
            </div>
            <div className="col-4">
              <Scratchoff image={numbers[5] && images[numbers[5].toString()]} />
            </div>
          </div>
          <div className="row" style={{ marginTop: '15rem'}}>
            <div className="col-4">
              <Scratchoff image={numbers[6] && images[numbers[6].toString()]} />
            </div>
            <div className="col-4">
              <Scratchoff image={numbers[7] && images[numbers[7].toString()]} />
            </div>
            <div className="col-4">
              <Scratchoff image={numbers[8] && images[numbers[8].toString()]} />
            </div>
          </div>
        </>
        : <center>
            <h2 className="mt-4 mb-3">Redeem your digital scratch card</h2>
            <button className="btn btn-primary btn-lg" onClick={redeemCard}>
              Redeem
            </button>
          </center>
      }
     
    </div>
  )
}

export default ScratchCard;