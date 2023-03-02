import { useState } from 'react';
import { FaCog } from 'react-icons/fa';

const Block = ({ strategyName, image, score, cryptoLogo, buyAssetState, underlayingAssetState }) => {
  const {selectedBuyAsset, setSelectedBuyAsset} = buyAssetState;
  const {selectedUnderlayingAsset, setSelectedUnderlayingAsset} = underlayingAssetState;

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [orderPrice, setOrderPrice] = useState("");

  const [maxSlipage, setMaxSlipage] = useState({
    value: 0.5,
    show: false,
  });

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

  const showmaxSlipage = () => {
    setMaxSlipage({
      ...maxSlipage,
      show: !maxSlipage.show,
    });
  };

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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <input
                    style={{ width: "90%" }}
                    type="number"
                    value={orderPrice}
                    onChange={handlePriceChange}
                  />
                  <button
                    style={{ width: "10%", border: "none", backgroundColor: 'transparent'}}
                  >
                    <FaCog style={{cursor: 'pointer'}} onClick={showmaxSlipage}/>
                    
                  </button>
                </div>
                {maxSlipage.show && (
                  <div>
                    <label>max slipage: </label>
                    <input
                      type="number"
                      value={maxSlipage.value}
                      onChange={(e) => setMaxSlipage({value: e.target.value, show: true})}
                      style={{ width: "50px" }}
                    />

                    <i>%</i>
                  </div>
                )}
                
                <button className="modal-btn" onClick={handleModalClose}>
                  Valider
                </button>
            </div>
            {/* <div className="modal-image-wrapper">
                <img className="modal-image" src={image} alt={strategyName} />
            </div> */}
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
