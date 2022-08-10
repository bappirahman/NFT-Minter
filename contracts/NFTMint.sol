// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMint is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenId; 
  constructor() ERC721("Metaverse Token","MLT") {}

  function createToken(string memory tokenURI) public returns (uint) {
    _tokenId.increment();
    uint newTokenId = _tokenId.current();
    _mint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);
    return newTokenId;
  }
}