const buidler = require("@nomiclabs/buidler")
const PrizePoolAbi = require('@pooltogether/pooltogether-contracts/abis/PrizePool.json')
const SingleRandomWinnerAbi = require('@pooltogether/pooltogether-contracts/abis/SingleRandomWinner.json')
const IERC20ABI = require("@pooltogether/pooltogether-contracts/abis/IERC20.json")

async function poolAt(poolAddress) {
  const signers = await buidler.ethers.getSigners()
  return new buidler.ethers.Contract(poolAddress, PrizePoolAbi, signers[0])
}

async function singleRandomWinnerAt(singleRandomWinnerAddress) {
  const signers = await buidler.ethers.getSigners()
  return new buidler.ethers.Contract(singleRandomWinnerAddress, SingleRandomWinnerAbi, signers[0])
}

async function erc20At(tokenAddress) {
  const signers = await buidler.ethers.getSigners()
  return new buidler.ethers.Contract(tokenAddress, IERC20ABI, signers[0])
}

module.exports = {
  poolAt,
  singleRandomWinnerAt,
  erc20At
}