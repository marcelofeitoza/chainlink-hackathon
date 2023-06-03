// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';

contract Treasury is Ownable {
    uint256 public totalFunds;
    address public pay;
    bool public isReleased;

    constructor(address _pay) payable {
        pay = _pay;
        totalFunds = msg.value;
        isReleased = false;
    }

    function releaseFunds() public onlyOwner {
        require(!isReleased, 'Funds already released');
        isReleased = true;
        payable(pay).transfer(totalFunds);
    }
}