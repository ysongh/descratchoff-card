import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Scratchoff from '../components/Scratchoff';
import { NFTPORT_APIKEY } from '../config';
import { DESCRATCHOFF_ADDRESS } from '../config';

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

function ScratchCard({ walletAddress, provider, DSOContract, glDSOContract }) {
  const { id } = useParams();

  const [artistCard, setArtistCard] = useState(null);
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

    const collection = await DSOContract.artistCards(nft.artistCardId.toString());
    console.log(collection);

    setArtistCard(collection);
  }

  const getNumbers = async () => {
    const randNumbers = await DSOContract.getNumbersByScratchCard(id);
    console.log(randNumbers);
    setNumbers(randNumbers);
  }

  const redeemCard = async () => {
    try {
      let { data } = await glDSOContract.populateTransaction.fillScratchCard(id);
      let txParams = {
        data: data,
        to: DESCRATCHOFF_ADDRESS,
        from: walletAddress,
        signatureType: "PERSONAL_SIGN"
      };
      
      const tx = await provider.send("eth_sendTransaction", [txParams]);
      console.log(tx);
      provider.once(tx, (transaction) => {
        // Emitted when the transaction has been mined
        console.log(transaction);
        setShowCard(true);
      });
      
    } catch(error) {
      console.error(error);
    }
  }

  const mintNFT = async () => {
    try{
      const options = {
        method: 'POST',
        body: {
          chain: 'polygon',
          name: "DeScratchOff Card",
          description: `Mint from ${artistCard.artist}`,
          file_url: `https://ipfs.io/ipfs/${artistCard.coverPhotoCid}`,
          mint_to_address: walletAddress,
        },
        headers: {
          "Content-Type": "application/json",
          "Authorization": NFTPORT_APIKEY,
        },
      };
  
      const response = await fetch("https://api.nftport.xyz/v0/mints/easy/urls", options);
      const json = await response.json();
      console.log(json);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div className="container bg-light" style={{ height: "70vh"}}>
      {showCard
        ?  <>
            <h2 className="text-center mt-3">Right Click and hold to scratch the card</h2>
            <div className="row justify-content-center mt-3">
              <div className="col-sm-4 col-lg-2">
                <Scratchoff image={numbers[0] && images[numbers[0].toString()]} />
              </div>
              <div className="col-sm-4 col-lg-2">
                <Scratchoff image={numbers[1] && images[numbers[1].toString()]} />
              </div>
              <div className="col-sm-4 col-lg-2">
                <Scratchoff image={numbers[2] && images[numbers[2].toString()]} />
              </div>
            </div>
            <div className="row justify-content-center" style={{ marginTop: '10rem'}}>
              <div className="col-sm-4 col-lg-2">
                <Scratchoff image={numbers[3] && images[numbers[3].toString()]} />
              </div>
              <div className="col-sm-4 col-lg-2">
                <Scratchoff image={numbers[4] && images[numbers[4].toString()]} />
              </div>
              <div className="col-sm-4 col-lg-2">
                <Scratchoff image={numbers[5] && images[numbers[5].toString()]} />
              </div>
            </div>
            <div className="row justify-content-center" style={{ marginTop: '10rem'}}>
              <div className="col-sm-4 col-lg-2">
                <Scratchoff image={numbers[6] && images[numbers[6].toString()]} />
              </div>
              <div className="col-sm-4 col-lg-2">
                <Scratchoff image={numbers[7] && images[numbers[7].toString()]} />
              </div>
              <div className="col-sm-4 col-lg-2">
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
      {showCard && 
        <center style={{ marginTop: "13rem"}}>
          <button className='btn btn-primary btn-lg' onClick={mintNFT} >
            Mint NFT Free on Polygon
          </button>
        </center>
      }
    </div>
  )
}

export default ScratchCard;