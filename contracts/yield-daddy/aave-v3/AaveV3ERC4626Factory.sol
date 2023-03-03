// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.19;

import {ERC20} from "../../solmate/tokens/ERC20.sol";
import {ERC4626} from "../../solmate/mixins/ERC4626.sol";

import {IPool} from "./external/IPool.sol";
import {AaveV3ERC4626} from "./AaveV3ERC4626.sol";
import {ERC4626Factory} from "../base/ERC4626Factory.sol";

/// @title AaveV3ERC4626Factory
/// @author zefram.eth & blablalf
/// @notice Factory for creating AaveV3ERC4626 contracts without rewards (if any)
contract AaveV3ERC4626Factory is ERC4626Factory {
    /// -----------------------------------------------------------------------
    /// Errors
    /// -----------------------------------------------------------------------

    /// @notice Thrown when trying to deploy an AaveV3ERC4626 vault using an asset without an aToken
    error AaveV3ERC4626Factory__ATokenNonexistent();

    /// -----------------------------------------------------------------------
    /// Immutable params
    /// -----------------------------------------------------------------------

    /// @notice The Aave Pool contract
    IPool public immutable lendingPool;

    /// -----------------------------------------------------------------------
    /// Constructor
    /// -----------------------------------------------------------------------

    constructor(IPool lendingPool_) {
        require(address(lendingPool_) != address(0), "AaveV3ERC4626Factory: lendingPool cannot be zero address");
        lendingPool = lendingPool_;
        //require(false, "coucou");
    }

    /// -----------------------------------------------------------------------
    /// External functions
    /// -----------------------------------------------------------------------

    /// @inheritdoc ERC4626Factory
    function createERC4626(ERC20 asset) external virtual override returns (ERC4626 vault) {
        IPool.ReserveData memory reserveData = lendingPool.getReserveData(address(asset));
        address aTokenAddress = reserveData.aTokenAddress;
        if (aTokenAddress == address(0)) {
            revert AaveV3ERC4626Factory__ATokenNonexistent();
        }

        vault = new AaveV3ERC4626{salt: bytes32(0)}(asset, ERC20(aTokenAddress), lendingPool);

        emit CreateERC4626(asset, vault);
    }

    /// @inheritdoc ERC4626Factory
    function computeERC4626Address(ERC20 asset) external view virtual override returns (ERC4626 vault) {
        IPool.ReserveData memory reserveData = lendingPool.getReserveData(address(asset));
        address aTokenAddress = reserveData.aTokenAddress;

        vault = ERC4626(
            _computeCreate2Address(
                keccak256(
                    abi.encodePacked(
                        // Deployment bytecode:
                        type(AaveV3ERC4626).creationCode,
                        // Constructor arguments:
                        abi.encode(asset, ERC20(aTokenAddress), lendingPool)
                    )
                )
            )
        );
    }
}