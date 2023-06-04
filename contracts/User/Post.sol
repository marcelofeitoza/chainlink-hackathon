// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/utils/Counters.sol";

import "./Poll.sol";

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

    function createPoll(
        string memory _timestamp,
        string memory _content,
        string[] memory _pollChoices
    ) public returns (Poll) {
        return new Poll(_timestamp, _content, _pollChoices);
    }
}
