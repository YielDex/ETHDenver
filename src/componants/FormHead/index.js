import { useState } from "react";
import "./styles.css";

const FormHead = ({underlayingAssetState, buyAssetState}) => {
  
  const {selectedBuyAsset, setSelectedBuyAsset} = buyAssetState;
  const {selectedUnderlayingAsset, setSelectedUnderlayingAsset} = underlayingAssetState;

  const handleAssetChange = (event) => {
    setSelectedBuyAsset(event.target.value);
  };

  const handleUnderlayingAssetChange = (event) => {
    setSelectedUnderlayingAsset(event.target.value);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected asset:", selectedBuyAsset);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="targetbuyAsset">Target Buy Asset:</label>
        <select
          className="form-control"
          name="asset"
          id="targetbuyAsset"
          value={selectedBuyAsset}
          onChange={handleAssetChange}
        >
          <option value="">Select an asset</option>
          <option value="wBTC">wBTC</option>
          <option value="ETH">ETH</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="targetbyAsset">Target Buy Asset:</label>
        <select
          className="form-control"
          name="asset"
          id="underlyingAsset"
          value={selectedUnderlayingAsset}
          onChange={handleUnderlayingAssetChange}
        >
          <option value="">Select an asset</option>
          <option value="USDC">USDC</option>
          <option value="DAI">DAI</option>
        </select>
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default FormHead;
