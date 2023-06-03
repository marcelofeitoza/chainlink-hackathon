// SPDX-License-Identifier: MIT

import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';

contract Treasury is Ownable {
    uint256 public totalFunds;
    address public pay;
    bool public isReleased;

    contructor(address _pay) payable {
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