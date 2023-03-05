// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./gelato/Types.sol";
import "./OrderExecutor.sol";
import "./gelato/OpsTaskCreator.sol";
import './LendingVault.sol';

struct OrderDatas {
    address user;
    int256 price;
    int256 amount;
    address tokenIn;
    address tokenOut;
    bytes32 orderId;
    bool isExecuted;
}

contract OrderBook is OpsTaskCreator {
    mapping (int => OrderDatas) private orders; // returns order data
    int private orderNonce;
    address private admin;
    OrderExecutor private orderExecutor;
    LendingVault private lendingVault;
    event orderCreated(string, int256);

    modifier onlyAdmin {
        require(msg.sender == admin, "Not allowed address.");
        _; // Continue the execution of the function called
    }

    constructor(address _opsAddress) OpsTaskCreator(_opsAddress, address(this)) {
        admin = msg.sender;
    }

    function setOrderExecutor(OrderExecutor _orderExecutorAddress) public onlyAdmin {
        orderExecutor = _orderExecutorAddress;
    }

    function setLendingVault(address _lendingVaultAddress) public onlyAdmin {
        lendingVault = LendingVault(_lendingVaultAddress);
    } 

    function createOrder(int price, int amount, address _tokenIn, address tokenOut) external returns (int) {
        IERC20 TokenIn = IERC20(_tokenIn);
        
        // The user needs to approve this contract for the appropriate amount
        TokenIn.transferFrom(msg.sender, address(this), uint256(amount));

        bytes memory execData = abi.encodeCall(orderExecutor.executeOrder, (orderNonce));

        ModuleData memory moduleData = ModuleData({
            modules: new Module[](3),
            args: new bytes[](3)
        });

        moduleData.modules[0] = Module.RESOLVER;
        moduleData.modules[1] = Module.PROXY;
        moduleData.modules[2] = Module.SINGLE_EXEC;

        moduleData.args[0] = _resolverModuleArg(address(orderExecutor), abi.encodeCall(orderExecutor.checker, (orderNonce)));
        moduleData.args[1] = _proxyModuleArg();
        moduleData.args[2] = _singleExecModuleArg();

        bytes32 orderId = ops.createTask(
            address(orderExecutor), // contract to execute
            execData, // function to execute
            moduleData,
            0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
        );

        orders[orderNonce] = OrderDatas(msg.sender, price, amount, _tokenIn, tokenOut, orderId, false);

        // Transfer tokens to the vault
        TokenIn.transfer(address(lendingVault), uint256(amount)); // giving the money to the lending vault
        
        lendingVault.deposit(_tokenIn, amount, orderNonce); // depositing liquidity into the vault

        orderNonce++;

        emit orderCreated("orderNonce", orderNonce);

        return orderNonce;
    }

    function cancelOrder(int _orderNonce) external onlyAdmin {
        ops.cancelTask(orders[_orderNonce].orderId);
    }
    
    function setExecuted(int _orderNonce) external {
        require(msg.sender == address(orderExecutor), "Only the executor can set the order as executed");
        orders[_orderNonce].isExecuted = true;
    }

    function getOrder(int _orderNonce) public view returns (OrderDatas memory) {
        return orders[_orderNonce];
    }

    function getExecutorAddress() public view returns (address) {
        return address(orderExecutor);
    }

}


