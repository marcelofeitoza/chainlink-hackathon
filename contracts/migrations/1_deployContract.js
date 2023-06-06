const contractDonation = artifacts.require("Donation");

module.exports = function(deployer) {
    // deployment steps
    deployer.deploy(contractDonation);
  };