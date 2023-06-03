// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol';

abstract contract Token is ERC20Votes {
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply
    ) ERC20(_name, _symbol) {
        _mint(msg.sender, _initialSupply);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    // function mint (address to, uint256 amount) internal override(ERC20Votes) {
    //     super._mint(to, amount);
    // }

    // function burn (address from, uint256 amount) internal override(ERC20Votes) {
    //     super._burn(from, amount);
    // }
}