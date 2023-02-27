import { useState } from 'react';

const Block = ({ title, image, score, cryptoLogo, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [orderPrice, setOrderPrice] = useState("");

  const handleAssetChange = (event) => {
    setSelectedAsset(event.target.value);
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

  return (
    <>
      <div className="block" onClick={handleModalOpen}>
        <div className="image-wrapper">
          <img className="image" src={image} alt={title} />
        </div>
        <h2 className="title">
          {title}
          <img className="logo" src={cryptoLogo} />
        </h2>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{title}</h2>
              <button className="close-btn" onClick={handleModalClose}>
                X
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-image-wrapper">
                <img className="modal-image" src={image} alt={title} />
              </div>
              <h2 className="modal-title">
                {title}
                <img className="modal-logo" src={cryptoLogo} />
              </h2>
              <div className="modal-form">
                <label>Asset:</label>
                <select value={selectedAsset} onChange={handleAssetChange}>
                  <option value="">--Please choose an asset--</option>
                  <option value="Asset1">Asset1</option>
                  <option value="Asset2">Asset2</option>
                  <option value="Asset3">Asset3</option>
                </select>
                <label>Order price:</label>
                <input
                  type="number"
                  value={orderPrice}
                  onChange={handlePriceChange}
                />
                <button className="modal-btn" onClick={handleModalClose}>
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Block;
