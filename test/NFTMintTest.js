
const { expect } = require("chai");
const {ethers} = require("hardhat");

describe("NFTMint", () => {
  it("Checking if create function is working and tokenId is positive and not 0 also tokenId is incremeting by 1 for every call", async () => {
    const NFTMint = await ethers.getContractFactory("NFTMint");
    const nftMint = await NFTMint.deploy();
    let tokenId1 = await nftMint.createToken("");
    expect(tokenId1 >= 1);
    let tokenId2 = await nftMint.createToken("");
    expect(++tokenId1 === tokenId2);
  })
});
