// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import 'hardhat/console.sol';
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import './GeneScience.sol';
import './SlimeBase.sol';

contract SlimeBreed {
    GeneScience public geneScienceAddress;
    SlimeBase public slimeBaseAddress;

    constructor(address _geneScienceAddress, address _slimeBaseAddress) {
        geneScienceAddress = GeneScience(_geneScienceAddress);
        slimeBaseAddress = SlimeBase(_slimeBaseAddress);
    }

    // 프론트앤드와 소통하기 위한 이벤트
    // 소유자 주소와 토큰Id 받기
    event Received(address, uint256);
    // NFT 토큰 정보 보기
    event Birth(
        address owner,
        uint256 tokenId,
        string genes,
        uint256 fatherTokenId,
        uint256 motherTokenId,
        string slimeType,
        uint256 health,
        uint256 attack
    );
    // web3 type문제로 인해 주석처리
    // 이더를 받기위한 fallback 함수 (external, payable 필수)
    // receive() external payable {
    //     emit Received(msg.sender, msg.value);
    // }


    // 프론트에서 슬라임 정보 보기 위한 함수
    function getSlimeByTokenId(uint256 _tokenId) public view returns (
            string memory genes,
            uint256 fatherTokenId,
            uint256 motherTokenId,
            string memory slimeType,
            uint256 health,
            uint256 attack
        )   {

        (genes, fatherTokenId, motherTokenId, slimeType, health, attack) = slimeBaseAddress.slimes(_tokenId);

        return (genes, fatherTokenId, motherTokenId, slimeType, health, attack);
    }
      
    // 슬라임 브리딩하는 함수
    function breedslimes(uint256 _fatherTokenId, uint256 _motherTokenId) external {
        //require(msg.sender != deployer, 'Disallow deployer to breed');
        require(slimeBaseAddress.ownerOf(_fatherTokenId) == msg.sender, 'Sender must own the token');
        require(slimeBaseAddress.ownerOf(_motherTokenId) == msg.sender, 'Sender must own the token');

        (string memory _fatherGene, , , , , ) = slimeBaseAddress.slimes(_fatherTokenId);
        (string memory _motherGene, , , , , ) = slimeBaseAddress.slimes(_motherTokenId);

        string memory newGene;
        string memory newType;
        uint256 newHealth;
        uint256 newAttack;

        //mixGene 에서 유전자 뽑기
        (newGene, newType, newHealth, newAttack) = geneScienceAddress.mixGeneReturnAll(_fatherGene, _motherGene);

        uint256 newTokenId = slimeBaseAddress.createSlime(
            newGene,
            _fatherTokenId,
            _motherTokenId,
            newType,
            newHealth,
            newAttack,
            msg.sender
        );
        
        // 이벤트 출력
        emit Birth(
            msg.sender,
            newTokenId,
            newGene,
            _fatherTokenId,
            _motherTokenId,
            newType,
            newHealth,
            newAttack
        );     
    }
}