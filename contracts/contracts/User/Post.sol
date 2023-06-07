// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract PostFactory is ERC721, ERC721Burnable {
    using Counters for Counters.Counter;
    mapping(address => uint256 postId) public userPostCounter;
    mapping(address => Post[]) public userPost;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Post", "POST") {}

    struct Post {
        string description;
        string image;
    }

    mapping(uint256 => Post) private _posts;
    event NewPost(address indexed owner, uint256 indexed tokenId, string description, string image);

    function createPost(
        string memory _description,
        string memory _image
    ) public {
        uint256 newTokenId = _tokenIdCounter.current();
        userPostCounter[msg.sender] += newTokenId;
        _safeMint(msg.sender, newTokenId);

        Post memory newPost = Post(_description, _image);
        _posts[newTokenId] = newPost;
        userPost[msg.sender].push(newPost);


        emit NewPost(msg.sender, newTokenId, _description, _image);
        _tokenIdCounter.increment();
    }

    function getPost(uint256 tokenId) public view
        returns (
            string memory description,
            string memory image,
            address owner,
            uint256 id
        )
    {
        require(_exists(tokenId), "Post does not exist");
        Post memory post = _posts[tokenId];
        address postOwner = ownerOf(tokenId);
        return (post.description, post.image, postOwner, tokenId);
    }

    function deletePost(uint256 tokenId) public {
        _burn(tokenId);
    }
}
