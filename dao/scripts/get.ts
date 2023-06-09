import { ethers, getChainId, network } from "hardhat"
import {
    developmentChains,
    VOTING_DELAY,
    proposalsFile,
    FUNC,
    PROPOSAL_DESCRIPTION,
    NEW_STORE_VALUE,
} from "../helper-hardhat-config"
import * as fs from "fs"
import { moveBlocks } from "../utils/move-blocks"

export async function getProposals() {
    const governor = await ethers.getContract("GovernorContract")
    const proposals = await governor.getAllProposals();

    const formattedProposals = proposals.map((proposal: any) => ({
        id: proposal.id.toNumber(),
        proposer: proposal.proposer,
        eta: proposal.eta.toNumber(),
        startBlock: proposal.startBlock.toNumber(),
        endBlock: proposal.endBlock.toNumber(),
        forVotes: proposal.forVotes.toNumber(),
        againstVotes: proposal.againstVotes.toNumber(),
        canceled: proposal.canceled,
        executed: proposal.executed,
    }));

    console.log(formattedProposals);
}

getProposals()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })
