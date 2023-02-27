import React, { useState } from "react";
import "./styles.css";

const generateProtocol = () => {
    const protocols = ["Yearn", "Aave"];
    return protocols[Math.floor(Math.random() * protocols.length)];
}

const generateCrypto = () => {
    const cryptos = ["ETH", "BTC", "DAI", "USDC", "USDT"];
    return cryptos[Math.floor(Math.random() * cryptos.length)];
}

const generateData = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        title: `${generateProtocol() + " " + generateCrypto()}`,
        image: `https://source.unsplash.com/random/${300 + i}x${300 + i}`,
        score: Math.floor(Math.random() * 5) + 1
      });
    }
    return data;
};

const data = generateData(10);

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

export default function Strategies() {
  return (
    <div className="Strategies">
      <h1>Blocs avec titre, image et score</h1>
      <div className="blocks">
        {data.map((item, index) => (
          <Block
            key={index}
            title={item.title}
            image={item.image}
            score={item.score}
          />
        ))}
      </div>
    </div>
  );
}
