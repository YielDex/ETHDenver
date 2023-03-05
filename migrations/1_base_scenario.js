// const Str = require('@supercharge/strings')
const BigNumber = require('bignumber.js');

const dotenv = require('dotenv');
const env = dotenv.config();

var OrderBook = artifacts.require("OrderBook.sol");
var LendingVault = artifacts.require("LendingVault.sol");
var OrderExecutor = artifacts.require("OrderExecutor.sol");
var IERC20 = artifacts.require("IERC20.sol");

module.exports = (deployer, _network, _accounts) => {
    deployer.then(async () => {
    console.log("process", env.parsed);
    
    // Deploying OrderBook contract
    OrderBook = await OrderBook.new(env.parsed.Ops);
    OrderExecutor = await OrderExecutor.new(env.parsed.Ops, OrderBook.address, env.parsed.SwapRouter, env.parsed.TellorOracle);
    await OrderBook.setOrderExecutor(OrderExecutor.address);


    // Deploying LendingVault contract
		LendingVault = await LendingVault.new(env.parsed.IPoolAddressesProvider, env.parsed.DAI, OrderBook.address);
    await OrderBook.setLendingVault(LendingVault.address);
    await OrderExecutor.setLendingVault(LendingVault.address);

    // Listing addresses
    console.log("OrderBook address: " + OrderBook.address);
    console.log("OrderExecutor address: " + OrderExecutor.address);
    console.log("LendingVault address: " + LendingVault.address);

    // Funding OrderExecutor
    await OrderExecutor.send("150000000000000000");

    // Setting up USDC and approve contract for order creation
    //USDC = await IERC20.at(env.parsed.USDC);
    DAI = await IERC20.at(env.parsed.DAI);
    await DAI.approve(OrderBook.address, "10000000000000000000");

    // Get USDC balance before order
    usdcBalance1 = await DAI.balanceOf(_accounts[0]);
    usdcBalance1 = usdcBalance1.toString();
    console.log("DAI balance before order:", usdcBalance1);
    
    // Creating the order
    await OrderBook.createOrder("123", "10000000000000000000", env.parsed.DAI, env.parsed.WETH);

    // Force the condition to be true
    await OrderExecutor.setPrice("123");

    // One block waiting
    usdcBalance3 = await DAI.balanceOf(_accounts[0]);
    usdcBalance3 = usdcBalance3.toString();
    //console.log("USDC balance after redeem:", usdcBalance3);

    // Getting my funds back (we don't do it because at this block there is the order execution)
    //await OrderExecutor.withdraw();

    /*
    spotPrice = await OrderExecutor.getEthSpotPrice();
    console.log("eth spotPrice", spotPrice);
    */
    });
};

// truffle run verify OrderBook@0x27Dc7374e1C5BF954Daf6Be846598Af76A33F2a2 --network mumbai 
// truffle run verify OrderExecutor@0xaeaD98593a19074375cCf3ec22E111ce48C02c7E --network mumbai 
// truffle run verify LendingVault@0xaeaD98593a19074375cCf3ec22E111ce48C02c7E --network mumbai 
