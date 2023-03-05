// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./gelato/OpsReady.sol";
import "./OrderBook.sol";
import './LendingVault.sol';
import "./uniswap/ISwapRouter.sol";
import "./oracles/tellor/UsingTellor.sol";

contract OrderExecutor is OpsReady, UsingTellor {

    uint public price; // temporary, testing purposes only
    address private deployer;

    OrderBook private immutable orderBook;
    ISwapRouter private immutable swapRouter;
    LendingVault private lendingVault;

    event OrderDone(string, uint256);

    modifier onlyDeployer {
        require(msg.sender == deployer, "Not allowed address.");
        _; // Continue the execution of the function called
    }

    constructor(address _ops, address _taskCreator, address _swapRouter, address payable _tellorAddress) OpsReady(_ops, _taskCreator) UsingTellor(_tellorAddress) {
        price = 100; // arbitrary price for testing
        deployer = msg.sender;
        orderBook = OrderBook(_taskCreator);
        swapRouter = ISwapRouter(_swapRouter);
    }

    function setPrice(uint _price) public onlyDeployer {
        price = _price;
    }

    receive() external payable {}

    function setLendingVault(address _lendingVault) public onlyDeployer {
        lendingVault = LendingVault(_lendingVault);
    }

    function executeOrder(uint orderNonce) external onlyDedicatedMsgSender {
        // execute order with orderNonce here
        uint256 amountWithdrawed = lendingVault.withdraw(orderBook.getOrder(orderNonce).tokenIn, orderNonce);

        // Approving the appropriate amount that uniswap is gonna take on order to make the swap
        IERC20(orderBook.getOrder(0).tokenIn).approve(address(swapRouter), amountWithdrawed);

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
                amountIn: amountWithdrawed,
                amountOutMinimum: 0, // NOT IN PRODUCTION
                sqrtPriceLimitX96: 0 // NOT IN PRODUCTION
            });

        // The call to `exactInputSingle` executes the swap.
        swapRouter.exactInputSingle(params);

        orderBook.setExecuted(orderNonce);
        emit OrderDone("order_executed", orderNonce);
        
        _transfer(fee, feeToken);
    }

    function checker(uint orderNonce) external view returns (bool canExec, bytes memory execPayload) {
        canExec = orderBook.getOrder(orderNonce).price == price; // The condition that needs to be true for the task to be executed, you can filter the condition with the orderId
        execPayload = abi.encodeCall(OrderExecutor.executeOrder, orderNonce); // The function that you want to call on the contract
    }

    // Only used for testing
    function withdraw() public onlyDeployer {
        payable(msg.sender).transfer(address(this).balance);
    }

    // Needs to be funded
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
