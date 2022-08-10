const hre = require("hardhat");

async function main() {

  const NFTMint = await hre.ethers.getContractFactory("NFTMint");
  const nftMint = await NFTMint.deploy();

  await nftMint.deployed();

  console.log("NFTMint deployed to:", nftMint.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
