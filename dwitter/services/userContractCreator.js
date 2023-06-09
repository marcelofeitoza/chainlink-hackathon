import { ethers } from "ethers";
import Contract from "../../contracts/build/contracts/??????.json"

// const provider = new ethers.providers.InfuraProvider('rinkeby2', INFURA_API_KEY);

const prepare = (provider) => {
    const contractAddress = '?????';
    const contractABI = Contract.abi;
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    return contract;
}


export default async function createUserContract(provider){

    const contract = prepare(provider)

    const signer = await provider.getSigner();
    
    const contractWithSigner = contract.connect(signer);

    try{
        const transaction = await contractWithSigner.createUserContract()
        transaction.wait();
        console.log("finished")
        return transaction;
    } catch (e) {
        console.log(e)
        return "Transaction Error";
    }
}
//   writeContractVariable();