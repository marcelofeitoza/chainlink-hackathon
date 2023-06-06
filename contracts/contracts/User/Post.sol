// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "../../node_modules/@openzeppelin/contracts/utils/Counters.sol";

struct Donation {
    string currency;
    uint value;
    uint received;
}

contract Post {
    using Counters for Counters.Counter;

    Counters.Counter private postIdCounter;

    constructor() {
        postIdCounter.increment();
    }
}
