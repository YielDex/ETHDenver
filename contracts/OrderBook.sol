// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./Types.sol";
import "./OrderExecutor.sol";
import "./OpsTaskCreator.sol";
import './IERC4626.sol';

struct OrderDatas {
    address user;
    uint256 price;
    uint256 amount;
    address fromToken;
    address toToken;
    bytes32 orderId;
    bool isExecuted;
}

contract OrderBook is OpsTaskCreator {
    mapping (uint => OrderDatas) public orders; // returns order data
    uint orderNonce;
    address public admin;
    OrderExecutor public orderExecutor;
    IERC4626 public lendingVault;
    event construct(string, address);

    constructor() OpsTaskCreator(0xc1C6805B857Bef1f412519C4A842522431aFed39, address(this)) {
        emit construct("address(ops)", address(ops));
        orderExecutor = new OrderExecutor(address(ops), 0x08f6dDE16166F06e1d486749452dc3A44f175456);
        // we create new "LendingVault" contract here
        //lendingVault = IERC4626(address);
        admin = msg.sender;
    }

    function createOrder(uint price, uint amount, address fromToken, address toToken) external returns (uint) {
        IERC20 FromToken = IERC20(fromToken);
        //FromToken.transferFrom(fromToken, msg.sender, address(this), amount);
        //FromToken.approve(address(orderExecutor), amount);
        //FromToken.transfer(toToken, amount);

        bytes memory execData = abi.encodeCall(orderExecutor.executeOrder, (orderNonce));

        ModuleData memory moduleData = ModuleData({
            modules: new Module[](2),
            args: new bytes[](2)
        });

        moduleData.modules[0] = Module.RESOLVER;
        moduleData.modules[1] = Module.SINGLE_EXEC;

        moduleData.args[0] = _resolverModuleArg(address(orderExecutor), abi.encodeCall(orderExecutor.checker, (orderNonce)));
        moduleData.args[1] = _singleExecModuleArg();

        // Faulty
        bytes32 orderId = ops.createTask(
            address(orderExecutor), // contract to execute
            execData, // function to execute
            moduleData,
            0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
        );

        orders[orderNonce] = OrderDatas(msg.sender, price, amount, fromToken, toToken, orderId, false);
        orderNonce++;

        return orderNonce;
    }

    function cancelOrder(uint _orderNonce) external {
        require(
            msg.sender == admin || orders[_orderNonce].user == msg.sender,
            "Not allowed to cancel this order"
        );
        ops.cancelTask(orders[_orderNonce].orderId);
    }

    // function to return executor address in order to check the txs
    function getExecutorAddress() public view returns (address) {
        return address(orderExecutor);
    }

    function setPrice(uint price) public {
        orderExecutor.setPrice(price);
    }

    
    function setExecuted(uint orderNonce) public {
        require(msg.sender == address(orderExecutor), "Only the executor can set the order as executed");
        orders[orderNonce].isExecuted = true;
    }

    function getOrder(uint orderNonce) public view returns (OrderDatas memory) {
        return orders[orderNonce];
    }

}


