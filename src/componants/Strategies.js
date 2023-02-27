import Block from "./Block";
import "./styles.css";

const generateProtocol = () => {
    const protocols = [{
        protocolName:"Yearn",
        protocolLogo:'https://pbs.twimg.com/profile_images/1537201399481700352/nub3IJbS_400x400.jpg'
      },{
        protocolName:"Aave",
        protocolLogo:'https://cryptologos.cc/logos/aave-aave-logo.png'
      }
    ];
    return protocols[Math.floor(Math.random() * protocols.length)];
}

const generateCrypto = () => {
    const cryptos = [{
      cryptoName:"ETH",
      cryptoLogo:'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880'
    },
    {
      cryptoName:"USDC",
      cryptoLogo:'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389'
    },{
      cryptoName:"DAI",
      cryptoLogo:'https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734'
    }];
    return cryptos[Math.floor(Math.random() * cryptos.length)];
}

const generateData = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
      let {protocolName, protocolLogo} = generateProtocol();
      let {cryptoName, cryptoLogo} = generateCrypto();
      data.push({
        title: `${protocolName + " " + cryptoName}`,
        // image: `https://source.unsplash.com/random/${300 + i}x${300 + i}`,
        image: protocolLogo,
        score: Math.floor(Math.random() * 5) + 1,
        cryptoLogo: cryptoLogo
      });
    }
    return data;
};

const data = generateData(10);

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
            cryptoLogo={item.cryptoLogo}
          />
        ))}
      </div>
    </div>
  );
}
