// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// NFT === ERC721
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintAnimalToken is ERC721Enumerable {
  // 스마트 컨트랙이 빌드될 때 한번 실행됨
  // ERC721(name, symbol)
  constructor() ERC721("h662Animals", "HAS") {}
  
  // mapping: key-value 쌍의 hash table
  // key: animalTokenId => value: animalType(다섯가지 동물: 1,2,3,4,5)
  mapping(uint256 => uint256) public animalTypes;

  function mintAnimalToken() public {
    // animalTokenId == NFT id
    // 1,2,3,4,5 ...로 만듦
    // totalSupply() == 발행된 NFT토큰의 수, ERC721Enumerable에서 제공
    uint256 animalTokenId = totalSupply() + 1; 

    // solidity에서 random 만들기
    uint256 animalType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, animalTokenId))) % 5 + 1;
    
    animalTypes[animalTokenId] = animalType;

    // _mint 함수
    // msg.sender: minting 누른사람, NFT 주인
    _mint(msg.sender, animalTokenId);
  } 
}
