import React, { useState }from 'react';
import { useNavigate } from 'react-router-dom';
import { NFTStorage, File } from 'nft.storage';
import * as htmlToImage from 'html-to-image';
import lighthouse from 'lighthouse-web3';

import { NFT_STRORAGE_APIKEY } from '../config';

const client = new NFTStorage({ token: NFT_STRORAGE_APIKEY })

function CreateCard({ provider, DSOContract }) {
  const navigate = useNavigate();

  const [coverImageCid, setCoverImageCid] = useState("");
  const [imagesList, setImagesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const sign_message = async () => {
    const signer = provider.getSigner();
    const address = await signer.getAddress();
   
    const res = await fetch(`https://api.lighthouse.storage/api/lighthouse/get_message?publicKey=${address}`);
    const data = await res.json();
    const message = data;
    const signed_message = await signer.signMessage(message);
    return({
      message: message,
      signed_message: signed_message,
      address: await signer.getAddress()
    });
  }

  const getImage = event => {
    const files = event.target.files;
    console.log(files, event);
    let newImages = [];

    for(let i = 0; i < files.length; i++){
      newImages.push({
        file: files[i],
        fileName: files[i].name,
        fileType: files[i].type
      });
    }
    setImagesList(newImages);
  }

  const createCard = async () => {
    try {
      setLoading(true);

      let sendFiles = [];
      let imageNames = [];
      
      for(let image of imagesList){
        sendFiles.push(new File([image.file], image.fileName, { type: image.fileType }));
        imageNames.push(image.fileName);
      }

      const metadata = await client.storeDirectory(sendFiles);
      console.log(metadata);

      const userCollection = document.getElementById("user-collection");
      const dataUrl = await htmlToImage.toPng(userCollection);
      console.log(dataUrl);

      console.log(imageNames);
      
      const transaction = await DSOContract.createScratchCard(`${metadata}/${imageNames[0]}`, metadata, imageNames);
      const tx = await transaction.wait();
      console.log(tx);

      setLoading(false);
      navigate('/scratchcardlist');
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  }

  const uploadCoverImageToLighthouse = async (e) => {
    e.persist();

    const signing_response = await sign_message();

    const cost = (await lighthouse.getQuote(e.size, "polygon-testnet")).totalCost.toFixed(18).toString();
    console.log(cost);

    const deploy_response = await lighthouse.deploy(e, signing_response.address, signing_response.signed_message, true);
    console.log(deploy_response);

    const add_cid_response = await lighthouse.addCid(deploy_response.Name, deploy_response.Hash);
    console.log(add_cid_response);
    setCoverImageCid(add_cid_response.pin.cid);
  }

  return (
    <div className="container">
      <div className="card card-body m-auto mt-4" style={{ maxWidth: "500px"}}>
        <h2>Create Digital Scratch Card</h2>
        {/* <div className="mb-3">
          <label htmlFor="cover-photo" className="form-label">
            Add Image for Digital Scratch Card Cover
          </label>
          <input className="form-control" type="file" id="cover-photo" onChange={uploadCoverImageToLighthouse} />
        </div> */}
        <div className="mb-3">
          <label htmlFor="formFileMultiple" className="form-label">
            Add 9 Images
          </label>
          <input className="form-control" type="file" id="formFileMultiple" onChange={getImage} multiple />
        </div>
        <div id="user-collection" className="row my-4">
          {imagesList.map((image, index) => (
            <div key={index} className="col-4">
              <img src={URL.createObjectURL(image.file)} className="img-fluid" alt={image.fileName} />
            </div>
           ))}
        </div>
        {loading
           ? <p>Loading...</p>
           : <button className="btn btn-primary mb-3" onClick={createCard}>
              Create Card
            </button>
        }
      </div>
    </div>
  )
}

export default CreateCard;