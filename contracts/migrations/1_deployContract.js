const contractDonation = artifacts.require("Donation");
const contractProfileImage = artifacts.require("ProfileDNFT");
const contractPost = artifacts.require("PostFactory");

module.exports = function(deployer) {
    // deployment steps
    // const updateInterval = 60 * 60 * 24; // 1 day
    const updateInterval = 120;
    deployer.deploy(contractDonation);
    deployer.deploy(contractProfileImage, updateInterval);
    deployer.deploy(contractPost);
  };