// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/utils/Counters.sol";

struct PollChoice {
    string choice;
    address[] voters;
}

struct Comment {
    address user;
    string comment;
}

contract Poll {
    using Counters for Counters.Counter;

    Counters.Counter private postIdCounter;

    uint public id;
    address public owner; // user
    string public timestamp;
    string public content; // post
    string public postType = "poll"; // "poll"
    PollChoice[] public pollChoices;
    address[] public likes;
    address[] public dislikes;
    Counters.Counter private commentIdCounter;
    mapping(uint => Comment) public comments;

    constructor(
        string memory _timestamp,
        string memory _content,
        string[] memory _pollChoices
    ) {
        postIdCounter.increment();
        id = postIdCounter.current();
        timestamp = _timestamp;
        content = _content;

        for (uint i = 0; i < _pollChoices.length; i++) {
            pollChoices.push(PollChoice(_pollChoices[i], new address[](0)));
        }

        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function addComment(string memory _comment) public {
        reward(owner, 1);
        commentIdCounter.increment();
        comments[commentIdCounter.current()] = Comment(msg.sender, _comment);
    }

    function like() public {
        reward(owner, 1);
        likes.push(msg.sender);
    }

    function dislike() public {
        dislikes.push(msg.sender);
    }

    function vote(uint _choice) public {
        pollChoices[_choice].voters.push(msg.sender);
    }

    function getPollChoices() public view returns (PollChoice[] memory) {
        return pollChoices;
    }

    function getLikes() public view returns (address[] memory) {
        return likes;
    }

    function getDislikes() public view returns (address[] memory) {
        return dislikes;
    }

    function getComments() public view returns (Comment[] memory) {
        Comment[] memory _comments = new Comment[](commentIdCounter.current());
        for (uint i = 0; i < commentIdCounter.current(); i++) {
            _comments[i] = comments[i + 1];
        }
        return _comments;
    }

    function getVoters(uint _choice) public view returns (address[] memory) {
        return pollChoices[_choice].voters;
    }

    function getPoll()
        public
        view
        returns (
            uint,
            string memory,
            string memory,
            string memory,
            PollChoice[] memory,
            address[] memory,
            address[] memory,
            Comment[] memory
        )
    {
        return (
            id,
            timestamp,
            content,
            postType,
            pollChoices,
            likes,
            dislikes,
            getComments()
        );
    }
}
