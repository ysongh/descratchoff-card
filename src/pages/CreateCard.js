import React, { useState }from 'react';

function CreateCard({ user, mint, account }) {
  const [imagesList, setImagesList] = useState([]);

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
        <button className="btn btn-primary mb-3" onClick={getImage}>
          Create Card
        </button>
      </div>
    </div>
  )
}

export default CreateCard;