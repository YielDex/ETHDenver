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

const generateUnderlayingAsset = () => {
  const underlayingAssets = [{
    underlayingAssetName:"USDC",
    underlayingAssetLogo:'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389'
  },{
    underlayingAssetName:"DAI",
    underlayingAssetLogo:'https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734'
  }];
  return underlayingAssets[Math.floor(Math.random() * underlayingAssets.length)];
}

const generateTargetedBuyAsset = () => {
  const targetedBuyAssets = [{
    targetedBuyAssetName:"ETH",
    targetedBuyAssetLogo:'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880'
  },{
    targetedBuyAssetName:"wBTC",
    targetedBuyAssetLogo:'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
  }];
  return targetedBuyAssets[Math.floor(Math.random() * targetedBuyAssets.length)];
}


const generateData = (count) => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      let {protocolName, protocolLogo} = generateProtocol();
      let {underlayingAssetName, underlayingAssetLogo} = generateUnderlayingAsset();
      blocks.push({
        strategyName: `${protocolName + " " + underlayingAssetName }`,
        // image: `https://source.unsplash.com/random/${300 + i}x${300 + i}`,
        image: protocolLogo,
        score: Math.floor(Math.random() * 5) + 1,
        cryptoLogo: underlayingAssetLogo,
        underlayingAsset: underlayingAssetName,
      });
    }
    return blocks;
};


export default function Strategies({ selectedBuyAsset, selectedUnderlayingAsset}) {

  let blocks = generateData(10);
  blocks = blocks.filter((item) => item.underlayingAsset === selectedUnderlayingAsset);


  return (
    <div className="Strategies">
      <h1>Blocs avec titre, image et score</h1>
      <div className="blocks">
        {selectedUnderlayingAsset && (
          blocks.map((item, index) => (
            <Block
              key={index}
              strategyName={item.strategyName}
              image={item.image}
              score={item.score}
              cryptoLogo={item.cryptoLogo}
            />
          )
        ))}
      </div>
    </div>
  );
}
