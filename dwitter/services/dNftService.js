import { ethers } from "ethers";
import Contract from "../../contracts/build/contracts/ProfilImage.json"

const prepare = (provider) => {
    const contractAddress = '0xeE952aA0aEE35cF70489384e3A7674dc890A5cdF';
    const contractABI = Contract.abi;
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    return [contract, contractAddress, contractABI];
}

const sendFileToIPFS = async (file) => {
    let stageCounter = 0;

    if (file) {
        const formData = new FormData()
        formData.append("file", file)

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "bf67cf4376213d9d9cb0", // `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key:
              "5250eddb652c2e750bdf57d8ed79ee762564fed74c4ebfd78bb35dd4dbbe5a17", // `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        })

        const fileHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`

        const json = {
            image: fileHash,
            attributes: [
              {
                "trait-type": "Stage",
                value: stageCounter.toString(),
              },
            ],
          };
        
        stageCounter++;
    
        return json;
    }
}

const sendJsonToIpfs = async (json) => {
}

const checkUpkeep = async () => {
    const upkeepNeeded = await contract.checkUpkeep();
    console.log('Precisa de manutenção:', upkeepNeeded);
}

const performUpkeep = async () => {
    await contract.performUpkeep();
    console.log('Manutenção realizada');
}

const updateImage = async (tokenId) => {
    await contract.updateImage(tokenId);
    console.log('Imagem do token', tokenId, 'atualizada com sucesso');
}

const tokenId = 1; // Defina o tokenId desejado
  updateImage(tokenId);
  