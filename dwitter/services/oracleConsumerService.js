import { ethers } from "ethers";
import Contract from "../../contracts/build/contracts/Donation.json"

// const provider = new ethers.providers.InfuraProvider('rinkeby2', INFURA_API_KEY);

const prepare = (provider) => {
    const contractAddress = '0x922fF83Abf19F487bF958F7c2F89238fc0b31777';
    const contractABI = Contract.abi;
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    return [contract, contractAddress, contractABI];
}

async function readDataFeed(contract) {
    const result = await contract.getPriceData();
    console.log(result);
    return result;
}


function convertRating(usdInput, ethwei) {
    const convertedData = ethwei / 10000000000000000;
    const usdToEth = usdInput / convertedData;
    return usdToEth;
}

export default async function donateAmount(provider, recipient, usdAmount) {
    const [contract, contractAddress, contractABI] = prepare(provider)

    const signer = await provider.getSigner();

    const contractWithSigner = contract.connect(signer);

    const ethwei = readDataFeed(contract);

    const usdToEth = convertRating(usdAmount, ethwei);

    console.log(ethers.parseEther(usdToEth));

    //const transaction = await contractWithSigner.fund(String(ethers.parseEther(usdToEth)), recipient );
    // await transaction.wait();
    console.log('Transação enviada com sucesso!');
    return "OK";
}
//   writeContractVariable();