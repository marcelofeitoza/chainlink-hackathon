// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ProfileImage.sol";

contract ProfileImageFactory {
    address[] public userPhotoContracts;

    function createUserPhoto(uint updateInterval) public returns (address) {
        ProfileDNFT newUserPhoto = new ProfileDNFT(updateInterval);
        userPhotoContracts.push(address(newUserPhoto));
        return userPhotoContracts[userPhotoContracts.length - 1];
    }

    function getUserPhotoContracts() public view returns (address[] memory) {
        return userPhotoContracts;
    }
}