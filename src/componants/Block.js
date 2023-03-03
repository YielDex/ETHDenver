import { useEffect, useState } from 'react';
import './PriceOracle'
import { useAccount } from 'wagmi'
import { prepareWriteContract, writeContract } from '@wagmi/core'

const Block = ({ strategyName, image, score, cryptoLogo, buyAssetState, underlayingAssetState }) => {
  const {selectedBuyAsset, setSelectedBuyAsset} = buyAssetState;
  const {selectedUnderlayingAsset, setSelectedUnderlayingAsset} = underlayingAssetState;

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [orderPrice, setOrderPrice] = useState("");
  const { address, isConnected } = useAccount();

  const handleAssetChange = (event) => {
    setSelectedBuyAsset(event.target.value);
  };

  const handlePriceChange = (event) => {
    setOrderPrice(event.target.value);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const placeOrder = () => {
    if(isConnected) {
      (async () => {
        const DAI_GOERLI_Address = '0xBa8DCeD3512925e52FE67b1b5329187589072A55'
        const wBTC_GOERLI_Address = '0x45AC379F019E48ca5dAC02E54F406F99F5088099'
        const config = await prepareWriteContract({
          address: '0xb78806a3f7F0A45Ef8179841d13a304abf07f105',
          abi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"","type":"string"},{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"construct","type":"event"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_orderNonce","type":"uint256"}],"name":"cancelOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"address","name":"fromToken","type":"address"},{"internalType":"address","name":"toToken","type":"address"}],"name":"createOrder","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dedicatedMsgSender","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fundsOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getExecutorAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderNonce","type":"uint256"}],"name":"getOrder","outputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"address","name":"fromToken","type":"address"},{"internalType":"address","name":"toToken","type":"address"},{"internalType":"bytes32","name":"orderId","type":"bytes32"},{"internalType":"bool","name":"isExecuted","type":"bool"}],"internalType":"struct OrderDatas","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ops","outputs":[{"internalType":"contract IOps","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"orderExecutor","outputs":[{"internalType":"contract OrderExecutor","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"orders","outputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"address","name":"fromToken","type":"address"},{"internalType":"address","name":"toToken","type":"address"},{"internalType":"bytes32","name":"orderId","type":"bytes32"},{"internalType":"bool","name":"isExecuted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderNonce","type":"uint256"}],"name":"setExecuted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"taskTreasury","outputs":[{"internalType":"contract ITaskTreasuryUpgradable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_token","type":"address"}],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}],
          functionName: 'createOrder',
          args: [orderPrice, wBTC_GOERLI_Address, DAI_GOERLI_Address],
          chainId: 5,
        })
        const { hash } = await writeContract(config)
        console.log(hash)
      })()
    }
    else{
      alert("Please connect your wallet")
    }
  }


  const currentOraclePrice = ''

  return (
    <>
      <div className="block" onClick={handleModalOpen}>
        <div className="image-wrapper">
          <img className="image" src={image} alt={strategyName} />
        </div>
        <h2 className="strategyName">
          {strategyName}
          <img className="logo" src={cryptoLogo} />
        </h2>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{strategyName}</h2>
              <button className="close-btn" onClick={handleModalClose}>
                X
              </button>
            </div>
            <div className="modal-body">
            <div className="modal-form">
                <label>Asset to buy:</label>
                <select value={selectedBuyAsset} onChange={handleAssetChange}>
                  <option value="">--Please choose an asset--</option>
                  <option value="ETH">ETH</option>
                  <option value="wBTC">wBTC</option>
                  <option value="Matic">Matic</option>
                </select>
                <label>Order price: </label>
                <input
                  type="number"
                  value={orderPrice}
                  onChange={handlePriceChange}
                />
                <button className="modal-btn" onClick={placeOrder}>
                  Valider
                </button>
            </div>
            <div className="modal-right">
              <p>Price: {currentOraclePrice}</p>
            </div>
            {selectedBuyAsset && orderPrice && (
                <p className="modal-strategyName">
                    Your order will get yield on {strategyName} waitting {selectedBuyAsset} price go down to {orderPrice} 
                    <img className="modal-logo" src={cryptoLogo} />
                </p>)
            }
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Block;
