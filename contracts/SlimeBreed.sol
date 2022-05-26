// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import 'hardhat/console.sol';
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import './SlimeBase.sol';

contract SlimeBreed is SlimeBase {

    // 프론트엔드를 위한 슬라임 struct
    struct SlimeMetaData {
        uint256 _id;
        string _genes;
        string _type;
        uint256 _fatherTokenId;
        uint256 _motherTokenId;
        uint256 _health;
        uint256 _attack;
        uint256 _price;
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

    constructor() SlimeBase() {
        // genes, fatherTokenId, motherTokenId, health, attack, owner
        createSlime('000000000', 0, 0, "green", 100, 10, msg.sender);
        // 토큰을 배포한 주소를 담는다.
        // setDeployer(msg.sender);
    }

    // web3 type문제로 인해 주석처리
    // 이더를 받기위한 fallback 함수 (external, payable 필수)
    // receive() external payable {
    //     emit Received(msg.sender, msg.value);
    // }


    // 프론트에서 슬라임 정보 보기 위한 함수
    function getSlimeByTokenId(uint256 _tokenId) public view returns (
            string memory _genes,
            uint256 _fatherTokenId,
            uint256 _motherTokenId,
            uint256 _health,
            uint256 _attack
            //uint256 _rarity
        )   {
        _genes = slimes[_tokenId].genes;
        _fatherTokenId = slimes[_tokenId].fatherTokenId;
        _motherTokenId = slimes[_tokenId].motherTokenId;
        _health = slimes[_tokenId].health;
        _attack = slimes[_tokenId].attack;
        //_rarity = slimeCountPerGene[slimes[_tokenId].genes];

        return (_genes,_fatherTokenId,_motherTokenId,_health,_attack);
    }
      
    // 슬라임 브리딩하는 함수
    function breedslimes(uint256 _fatherTokenId, uint256 _motherTokenId) external {
        // require(msg.sender != deployer, 'Disallow deployer to breed');
        require(ownerOf(_fatherTokenId) == msg.sender, 'Sender must own the token');
        require(ownerOf(_motherTokenId) == msg.sender, 'Sender must own the token');

        (string memory _fatherGene, , , ,) = getSlimeByTokenId(_fatherTokenId);
        (string memory _motherGene, , , ,) = getSlimeByTokenId(_motherTokenId);

        string memory newGene = mixGene(_fatherGene, _motherGene);
        string memory newType = "None";
        bytes memory _newGene = bytes(newGene);
        

        if(_newGene[2] == "0") {
            newType = "green";
        }
        else if(_newGene[2] == "1") {
            newType = "pink";
        }
        else {
            newType = "blue";
        }

        uint256 newTokenId = createSlime(
            newGene,
            _fatherTokenId,
            _motherTokenId,
            newType,
            100,
            10,
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
            100,
            10
        );
    }

}