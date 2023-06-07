// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "../node_modules/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Transfer {
    using SafeMath for uint256; // for versions < 0.6

    mapping(address => uint256) public addressToFunded;
    address public owner;

    // Funders test is by array index
    address[] public funders;


    AggregatorV3Interface internal dataFeed;

     /**
     * Network: Sepolia
     * Aggregator: BTC/USD
     * Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
     * Aggregator: ETH/USD
     * Address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
     */
    constructor() {
        dataFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        owner = msg.sender;
    }

    // Function that allows user to deposit 
    function fund() public payable {
        // Setting the minimum value to 1 U$
        uint256 minimumUSD = 1 * 10 ** 18;
        require(convertETHToUSD(msg.value) >= minimumUSD, "The minimum value(1 U$) was not reached!");
        addressToFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }
    
    // Function that converts get the price from data feed
    function getPriceData() public view returns (uint256) {
        // prettier-ignore
        (,int256 price,,,) = dataFeed.latestRoundData();
        return uint256(price * 10000000000);
        // 190275000000 -> 8 decimals -> 1,902.75000000
    }

    function getVersion() public view returns(uint256) {
        return dataFeed.version();
    }

    // Function that get the conversion rate ETH/USD
    // 1000000000(9 zeros)
    function convertETHToUSD(uint256 ethAmount) public view returns (uint256) {
        uint256 ethPrice = getPriceData();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1000000000000000000;
        
        return ethAmountInUsd;
        // 1 gwei to U$
        // 1902750000000 -> 18 decimals -> 0.000001902750000000
    }

    modifier isOwner {
        require(msg.sender == owner, "You're not the contract owner");
        _;
    }

    function transferUSDToUser(address payable recipient, uint256 usdAmount) public isOwner {
        require(usdAmount > 0, "Amount should be greater than zero");

        uint256 ethAmount = convertUSDToETH(usdAmount);
        require(address(this).balance >= ethAmount, "Insufficient balance in the contract");

        recipient.transfer(ethAmount);
    }

    function convertUSDToETH(uint256 usdAmount) public view returns (uint256) {
        uint256 ethPrice = getPriceData();
        uint256 ethAmount = usdAmount / (ethPrice/ 10 **18);

        return ethAmount;
    }

    // Function that withdraw the amount sent to the fund
    // function withdraw() payable isOwner public {
    //     // Send the money deposited to the contract owner
    //     msg.sender.transfer(address(this).balance);

    //     // Reseting all the variables
    //     for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++){
    //         address funder = funders[funderIndex];
    //         addressToFunded[funder] = 0;
    //     }
    //     funders = new address[](0);
    // }
}