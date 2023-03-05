// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./yield-daddy/aave-v3/AaveV3ERC4626Factory.sol";
import "./yield-daddy/aave-v3/IPoolAddressesProvider.sol";
import "./OrderBook.sol";

contract LendingVault {

    AaveV3ERC4626Factory private immutable aaveFactory;
    IPool private immutable aavePool;
    IPoolAddressesProvider private immutable aavePoolAddressesProvider;

    address private immutable orderBookAddress;
    address private immutable orderExecutorAddress;
    
    modifier onlyOrderBook {
        require(msg.sender == orderBookAddress, "Not allowed address.");
        _; // Continue the execution of the function called
    }
    
    modifier onlyOrderExecutor {
        require(msg.sender == orderExecutorAddress, "Not allowed address.");
        _; // Continue the execution of the function called
    }

    // In the future, there will be a mapping for each strategies for one asset rather than this one
    mapping(ERC20 => ERC4626) private erc4626s;
    mapping(uint256 => uint256) private orderShares;
    
    event Shares(uint256 shares);

    constructor(address _iPoolAddressesProviderAddress, address _orderBookAddress) {
        orderBookAddress = _orderBookAddress;
        aavePoolAddressesProvider = IPoolAddressesProvider(_iPoolAddressesProviderAddress);
        aavePool = IPool(aavePoolAddressesProvider.getPool());
        aaveFactory = new AaveV3ERC4626Factory(aavePool);
        orderExecutorAddress = OrderBook(orderBookAddress).getExecutorAddress();
    }

    function deposit(address tokenAddress, uint256 _amount, uint256 orderNonce) external onlyOrderBook {
        ERC20 depositToken = ERC20(tokenAddress);
        depositToken.approve(address(erc4626s[ERC20(tokenAddress)]), _amount);
        // If asset vault doesn't exist create it
        if (erc4626s[depositToken] == address(0)) {
            erc4626s[depositToken] = aaveFactory.createERC4626(depositToken);
        }

        orderShares[orderNonce] = erc4626s[depositToken].deposit(_amount, address(this));
    }

    function withdraw(address tokenAddress, uint256 orderNonce) external onlyOrderExecutor returns (uint256) {
        erc4626s[ERC20(tokenAddress)].approve(address(erc4626s[ERC20(tokenAddress)]), orderShares[orderNonce]);
        uint256 amount = erc4626s[ERC20(tokenAddress)].redeem(orderShares[orderNonce], address(this), address(this));
        ERC20(tokenAddress).transfer(OrderBook(orderBookAddress).getExecutorAddress(), amount);
        return amount;
    }

}