import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Scratchoff from '../components/Scratchoff';
import { NFTPORT_APIKEY } from '../config';
import { DESCRATCHOFF_ADDRESS } from '../config';
import { ButtonSpinner } from '../components/Spinners';

function ScratchCard({ walletAddress, provider, DSOContract, glDSOContract }) {
  const { id } = useParams();

  const [artistCard, setArtistCard] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');

  useEffect(() => {
    if(DSOContract) getScratchCard();
  }, [DSOContract])

  useEffect(() => {
    if(DSOContract) {
      getImageNames();
      getNumbers();
    }
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

  const getImageNames = async () => {
    const images = await DSOContract.getImageNamesByArtistCard(id);
    console.log(images);
    setImageNames(images);
  }

  const redeemCard = async () => {
    try {
      setRedeemLoading(true);

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
        console.log(transaction.transactionHash);
        setTransactionHash(transaction.transactionHash);
        setShowCard(true);
        setRedeemLoading(false);
      });
      
    } catch(error) {
      console.error(error);
      setRedeemLoading(false);
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
                {artistCard?.imagesCid && <Scratchoff imageCid={`${artistCard.imagesCid}/${imageNames[numbers[0]]}`} />}
              </div>
              <div className="col-sm-4 col-lg-2">
                {artistCard?.imagesCid && <Scratchoff imageCid={`${artistCard.imagesCid}/${imageNames[numbers[1]]}`} />}
              </div>
              <div className="col-sm-4 col-lg-2">
                {artistCard?.imagesCid && <Scratchoff imageCid={`${artistCard.imagesCid}/${imageNames[numbers[2]]}`} />}
              </div>
            </div>
            <div className="row justify-content-center" style={{ marginTop: '10rem'}}>
              <div className="col-sm-4 col-lg-2">
                {artistCard?.imagesCid && <Scratchoff imageCid={`${artistCard.imagesCid}/${imageNames[numbers[3]]}`} />}
              </div>
              <div className="col-sm-4 col-lg-2">
                {artistCard?.imagesCid && <Scratchoff imageCid={`${artistCard.imagesCid}/${imageNames[numbers[4]]}`} /> }
              </div>
              <div className="col-sm-4 col-lg-2">
                {artistCard?.imagesCid && <Scratchoff imageCid={`${artistCard.imagesCid}/${imageNames[numbers[5]]}`} />}
              </div>
            </div>
            <div className="row justify-content-center" style={{ marginTop: '10rem'}}>
              <div className="col-sm-4 col-lg-2">
                {artistCard?.imagesCid && <Scratchoff imageCid={`${artistCard.imagesCid}/${imageNames[numbers[6]]}`} />}
              </div>
              <div className="col-sm-4 col-lg-2">
                {artistCard?.imagesCid && <Scratchoff imageCid={`${artistCard.imagesCid}/${imageNames[numbers[7]]}`} />}
              </div>
              <div className="col-sm-4 col-lg-2">
                {artistCard?.imagesCid && <Scratchoff imageCid={`${artistCard.imagesCid}/${imageNames[numbers[8]]}`} />}
              </div>
            </div>
          </>
        : <center>
            <h2 className="mt-4 mb-3">Redeem your digital scratch card</h2>
            {redeemLoading
              ? <ButtonSpinner />
              : <button className="btn btn-primary btn-lg" onClick={redeemCard}>
                  Redeem
                </button>
            }
          </center>
      }
      {showCard && 
        <center style={{ marginTop: "13rem"}}>
          {transactionHash &&
            <p className="text-success">
              Success, see transaction {" "}
              <a href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
                {transactionHash.substring(0, 10) + '...' + transactionHash.substring(56, 66)}
              </a>
            </p>
          }
          <button className='btn btn-primary btn-lg' onClick={mintNFT} >
            Mint NFT Free on Polygon
          </button>
        </center>
      }
    </div>
  )
}

export default ScratchCard;