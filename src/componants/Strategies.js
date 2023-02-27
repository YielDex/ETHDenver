import Block from "./Block";
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
