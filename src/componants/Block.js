import { useState } from 'react';

const Block = ({ title, image, score }) => {
    const [rating, setRating] = useState(score);
  
    const handleClick = (value) => {
      setRating(value);
    };
  
    return (
      <div className="block">
        <div className="image-wrapper">
          <img className="image" src={image} alt={title} />
        </div>
        <h2 className="title">{title}</h2>
        {/* <div className="rating">
          {rating.toFixed(1)}<span>/5</span>
        </div> */}
      </div>
    );
};

export default Block;
