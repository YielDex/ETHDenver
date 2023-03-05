// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./gelato/OpsReady.sol";
import "./OrderBook.sol";
import './LendingVault.sol';
import "./uniswap/ISwapRouter.sol";
import "./oracles/chainlink/interface/AggregatorV3Interface.sol";

contract OrderExecutor is OpsReady {

    int256 public price; // temporary, testing purposes only
    address private deployer;

    OrderBook private immutable orderBook;
    ISwapRouter private immutable swapRouter;
    LendingVault private lendingVault;
    AggregatorV3Interface internal priceFeed;

    event OrderDone(string, int256);

    modifier onlyDeployer {
        require(msg.sender == deployer, "Not allowed address.");
        _; // Continue the execution of the function called
    }

    constructor(address _ops, address _taskCreator, address _swapRouter, address _linkFeedAddress) OpsReady(_ops, _taskCreator) {
        price = 100; // arbitrary price for testing
        deployer = msg.sender;
        orderBook = OrderBook(_taskCreator);
        swapRouter = ISwapRouter(_swapRouter);
        priceFeed = AggregatorV3Interface(_linkFeedAddress);
    }

    function setPrice(int _price) public onlyDeployer {
        price = _price;
    }

    receive() external payable {}

    function setLendingVault(address _lendingVault) public onlyDeployer {
        lendingVault = LendingVault(_lendingVault);
    }

    function executeOrder(int orderNonce) external onlyDedicatedMsgSender {
        // execute order with orderNonce here
        int256 amountWithdrawed = lendingVault.withdraw(orderBook.getOrder(orderNonce).tokenIn, orderNonce);

        // Approving the appropriate amount that uniswap is gonna take on order to make the swap
        IERC20(orderBook.getOrder(0).tokenIn).approve(address(swapRouter), uint256(amountWithdrawed));

        (uint256 fee, address feeToken) = _getFeeDetails();
        // Here we need to verify gasfees with an oracle (like chainlink)

        // Here we should put an order that is swapping the needed amount of underleying asset to wrapped native token
        // Then unwrap it to be able to send them to gelato node at the end of the function execution

        // Naively set amountOutMinimum to 0. In production, use an oracle or other data source to choose a safer value for amountOutMinimum.
        // We also set the sqrtPriceLimitx96 to be 0 to ensure we swap our exact input amount.
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: orderBook.getOrder(orderNonce).tokenIn,
                tokenOut: orderBook.getOrder(orderNonce).tokenOut,
                fee: 3000, // For this example, we will set the pool fee to 0.3%.
                recipient: orderBook.getOrder(orderNonce).user,
                deadline: block.timestamp,
                amountIn: uint256(amountWithdrawed),
                amountOutMinimum: 0, // NOT IN PRODUCTION
                sqrtPriceLimitX96: 0 // NOT IN PRODUCTION
            });

        // The call to `exactInputSingle` executes the swap.
        swapRouter.exactInputSingle(params);

        orderBook.setExecuted(orderNonce);
        emit OrderDone("order_executed", orderNonce);
        
        _transfer(uint256(fee), feeToken);
    }

    function checker(int orderNonce) external view returns (bool canExec, bytes memory execPayload) {
        // In a real situation, we should get the price from the aggregator (or here from uniswap) + an oracle to confirm the price
        // (we could even ask to the user if he/she wants the oracle confirmation) 
        // uint8 decimals;
        // (decimals, ) = getLatestWethPrice(); // Not useful if the value is in the correct format
        int256 oraclePrice;
        (oraclePrice, ) = getLatestWethPrice();
        bool condition = price <= oraclePrice;
        canExec = /*condition*/ orderBook.getOrder(orderNonce).price == price; // The condition that needs to be true for the task to be executed, you can filter the condition with the orderId
        execPayload = abi.encodeCall(OrderExecutor.executeOrder, orderNonce); // The function that you want to call on the contract
    }

    // Only used for testing
    function withdraw() public onlyDeployer {
        payable(msg.sender).transfer(address(this).balance);
    }

    function getLatestWethPrice() public view returns (int, uint8) {
        (, int256 _price, , , ) = priceFeed.latestRoundData();
        uint8 decimals = priceFeed.decimals();
        return (_price, decimals);
    }

    // Needs to be funded ?
    /*
    function getEthSpotPrice() external view returns(uint256) {
        bytes memory _queryData = abi.encode("SpotPrice", abi.encode("eth", "usd"));
        bytes32 _queryId = keccak256(_queryData);

        (bytes memory _value, uint256 _timestampRetrieved) =
            getDataBefore(_queryId, block.timestamp - 20 minutes);
        if (_timestampRetrieved == 0) return 0;
        require(block.timestamp - _timestampRetrieved < 24 hours);
        return abi.decode(_value, (uint256));
    }
    */

}
