// const Str = require('@supercharge/strings')
const BigNumber = require('bignumber.js');

var OrderBook = artifacts.require("OrderBook.sol");

module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
		// Get the deployed instance of the TD ERC20 contract
		OrderBook = await OrderBook.new();
    console.log("OrderBook address: " + OrderBook.address);
		
    
    });
};

// ops
//0x08f6dDE16166F06e1d486749452dc3A44f175456 tc

// truffle run verify ERC20TD@0x27Dc7374e1C5BF954Daf6Be846598Af76A33F2a2 --network goerli 
// truffle run verify Evaluator@0xaeaD98593a19074375cCf3ec22E111ce48C02c7E --network goerli 
