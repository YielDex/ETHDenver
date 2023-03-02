// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./OpsReady.sol";
import "./OrderBook.sol";

contract OrderExecutor is OpsReady {
    uint price;
    OrderBook public orderBook;
    event OrderDone(string);

    constructor(address _ops, address _taskCreator) OpsReady(_ops, _taskCreator) {
        price = 100; // arbitrary price
        orderBook = OrderBook(msg.sender);
    }

    function setPrice(uint _price) public {
        price = _price;
    }

    receive() external payable {}

    function executeOrder(uint orderNonce) external /*onlyDedicatedMsgSender*/ {
        // execute order with orderNonce here
        orderBook.setExecuted(orderNonce);
        emit OrderDone("order executed");
        // 
        (uint256 fee, address feeToken) = _getFeeDetails();
        _transfer(fee, feeToken);
    }

    function checker(uint orderNonce) external view returns (bool canExec, bytes memory execPayload) {
        // We need to check the liquidity
        // require(liquidity is okay)
        canExec = orderBook.getOrder(orderNonce).price == price; // The condition that needs to be true for the task to be executed, you can filter the condition with the orderId
        execPayload = abi.encodeCall(OrderExecutor.executeOrder, orderNonce); // The function that you want to call on the contract
    }

}


