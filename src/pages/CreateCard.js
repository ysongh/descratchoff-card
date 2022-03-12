import React, { useState }from 'react';
import { NFTStorage, File } from 'nft.storage';

import { NFT_STRORAGE_APIKEY } from '../config';

const client = new NFTStorage({ token: NFT_STRORAGE_APIKEY })

function CreateCard({ user, mint, account }) {
  const [imagesList, setImagesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImage = event => {
    const files = event.target.files;
    console.log(files);
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
      
      for(let image of imagesList){
        sendFiles.push(new File([image.file], image.fileName, { type: image.fileType }));
      }

      const metadata = await client.storeDirectory(sendFiles);
      console.log(metadata);
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="card card-body m-auto mt-4" style={{ maxWidth: "500px"}}>
        <h2>Create Digital Scratch Card</h2>
        <div className="mb-3">
          <label htmlFor="formFileMultiple" className="form-label">
            Add 9 Images
          </label>
          <input className="form-control" type="file" id="formFileMultiple" onChange={getImage} multiple />
        </div>
        <div className="row my-4">
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