// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Transfer {
    AggregatorV3Interface internal priceFeed;
    address public owner;

    IERC20 internal ethereumToken;
    address private constant ETH_ADDRESS = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);
    address private constant USD_ADDRESS = address(0x0000000000000000000000000000000000000000);

    constructor(address _price, address _ethereumToken) {
        priceFeed = AggregatorV3Interface(_price);
        ethereumToken = IERC20(_ethereumToken);
    }

    function convertEthToDol(uint256 _ethAmount) external {
        uint256 ethToUsdPrice = getEthToUsdPrice();
        uint256 usdAmount = (_ethAmount * ethToUsdPrice) / 1e8;

        ethereumToken.transferFrom(msg.sender, address(this), _ethAmount);
        ethereumToken.transfer(msg.sender, usdAmount);
    }

    function getEthToUsdPrice() public view returns (uint256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        require(price > 0, "Price not available");
        return uint256(price);
    }

    function depositEth() external payable {
        require(msg.value > 0, "No Ether deposited");
    }

    function withdrawEth(uint256 _amount) external {
        require(_amount > 0, "Invalid amount");
        payable(msg.sender).transfer(_amount);
    }
}
