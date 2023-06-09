import * as fs from "fs"
import { network, ethers, getChainId } from "hardhat"
import { proposalsFile, developmentChains, VOTING_PERIOD } from "../helper-hardhat-config"
import { moveBlocks } from "../utils/move-blocks"


async function main() {
  const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
  // Get the last proposal for the network. You could also change it for your index
  const chainID = await getChainId()
  const lastProposalId = proposals[chainID].at(-1)
  // const proposalId = proposals[network.config.chainId!][0];
  // 0 = Against, 1 = For, 2 = Abstain for this example
  const voteWay = 1
  const reason = "I lika do da cha cha"
  const description = "I lika do da cha cha"

  console.log({
    lastProposalId,
    voteWay,
    reason,
  })

  await vote(lastProposalId, voteWay, reason, 500000)
}

// 0 = Against, 1 = For, 2 = Abstain for this example
export async function vote(proposalId: string, voteWay: number, reason: string, gasLimit: number) {
  console.log("Voting...")

  const governor = await ethers.getContract("GovernorContract")
  const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason, { gasLimit })
  const voteTxReceipt = await voteTx.wait(1)

  console.log(voteTxReceipt.events[0].args.reason)

  const proposalState = await governor.state(proposalId)

  console.log(`Current Proposal State: ${proposalState}`)

  // if (developmentChains.includes(network.name)) {
  //   await moveBlocks(VOTING_PERIOD + 1)
  // }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
