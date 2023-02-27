import { useState } from 'react';

const Block = ({ title, image, score, cryptoLogo ,onClick }) => {

    console.log(cryptoLogo)
  
    return (
      <div className="block" onClick={onClick}>
        <div className="image-wrapper">
          <img className="image" src={image} alt={title} />
        </div>
        <h2 className="title">{title}<img className="logo" src={cryptoLogo}/></h2>
        {/* <div className="rating">
          {score.toFixed(1)}<span>/5</span>
        </div> */}
      </div>
    );
};

export default Block;
