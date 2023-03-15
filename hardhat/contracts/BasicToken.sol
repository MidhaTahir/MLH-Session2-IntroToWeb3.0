// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BasicToken is ERC20 {
    constructor() ERC20("BasicToken", "BTKN") {}

    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }
}
