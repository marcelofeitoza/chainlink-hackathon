// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ProfileImage.sol";

contract ProfileImageFactory {
    address[] public userPhotoContracts;

    function createUserPhoto(uint updateInterval) public {
        ProfileDNFT newUserPhoto = new ProfileDNFT(updateInterval);
        userPhotoContracts.push(address(newUserPhoto));
    }

    function getUserPhotoContracts() public view returns (address[] memory) {
        return userPhotoContracts;
    }
}