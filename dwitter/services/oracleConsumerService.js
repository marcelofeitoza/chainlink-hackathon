import { ethers } from "ethers";
import Contract from "../../../../contracts/build/contracts/Donation.json"

// const provider = new ethers.providers.InfuraProvider('rinkeby2', INFURA_API_KEY);
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = '0x922fF83Abf19F487bF958F7c2F89238fc0b31777';
const contractABI = Contract.abi;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

async function readDataFeed() {
    const result = await contract.getPriceData();
    console.log(result);
    return result;
  }
  readDataFeed();

function convertRating(usdInput) {
    const rawData = readDataFeed();
    const convertedData = rawData / 10000000000000000n;
    const usdToEth = usdInput / convertedData;
    return usdToEth;
}

async function donateAmount(recipient) {
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    const usdToEth = convertRating();
  
    const transaction = await contractWithSigner.fund({ value: ethers.utils.parseEther(usdToEth), to: recipient });
    // await transaction.wait();
    console.log('Transação enviada com sucesso!');
    return "OK";
}
//   writeContractVariable();
  
  