// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import 'hardhat/console.sol';

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import '@openzeppelin/contracts/utils/Counters.sol';
import './GeneScience.sol';
import './SlimeSale.sol';

contract SlimeBase is ERC721Enumerable {
    using Counters for Counters.Counter;
    GeneScience public geneScienceAddress;
    SlimeSale public slimeSaleAddress;

    constructor (address _geneScienceAddress) ERC721('Slimes', 'SLME'){
        geneScienceAddress = GeneScience(_geneScienceAddress);
        baseUri = '';

        // 테스트용 슬라임 생성
        // genes, fatherTokenId, motherTokenId, health, attack, owner
        createSlime('000300100', 0, 0, "green", 300, 100, msg.sender);
        createSlime('001300100', 0, 0, "pink", 300, 100, msg.sender);
        createSlime('002300100', 0, 0, "blue", 300, 100, msg.sender);
    }

    // SlimeSale address 이용해서 호출 (종속성주입)
    function setSlimeSaleAddress(address _slimeSaleAddress) public {
        slimeSaleAddress = SlimeSale(_slimeSaleAddress);
    }

    // 슬라임은 유전자, 부모의 토큰 아이디, 체력, 공격력으로 구성
    struct Slime {
        string genes;
        uint256 fatherTokenId;
        uint256 motherTokenId;
        string slimeType;
        uint256 health;
        uint256 attack;
    }

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

    // 토큰 번호를 메기기 위한 카운터 트래커
    Counters.Counter public slimeIndexTracker;
    // 슬라임 정보 모아놓는 mapping
    mapping(uint256 => Slime) public slimes;
    // 배포자 주소
    address public deployer;
    // baseURI
    string public baseUri;

    // key: ownerAddress => value: tokenId
    mapping(address => uint256[]) public ownersTokenIds;

    // 배포자의 잔액 확인 (external로 다큰 컨트랙트나 트랜잭션을 통해서만 호출)
    function getContractBalance() external view returns (uint256) { //onlyDeployer returns (uint256) {
        return address(this).balance;
    }

    // 슬라임 생성 후 토큰Id 리턴
    function createSlime(
        string memory _genes,
        uint256 _fatherTokenId,
        uint256 _motherTokenId,
        string memory _slimeType,
        uint256 _health,
        uint256 _attack,
        address _owner
    ) public returns (uint256) {
        // 유전자 길이가 9인지 확인
        require(geneScienceAddress.isGeneScience(_genes), 'Genes must be valid');
        // 카운터 트래커에서 현재 tokenId 번호를 가져옴
        uint256 newTokenId = slimeIndexTracker.current();

        Slime memory _slime = Slime({
            genes: _genes,
            fatherTokenId: _fatherTokenId,
            motherTokenId: _motherTokenId,
            slimeType: _slimeType,
            health: _health,
            attack: _attack
        });


        // 소유자 계정으로 토큰민팅
        _mint(_owner, newTokenId);
        // 슬라임 배열에 생성된 슬라임 추가
        slimes[newTokenId] = _slime;
        // 생성했으므로 카운터 트래커 인덱스++
        slimeIndexTracker.increment();

        return newTokenId;
    }

    /********************** frontend **********************/

    // 해당 계정이 가진 모든 슬라임 정보 반환
    function getSlimeTokensByAccount(address _slimeTokenOwner) view public returns (SlimeMetaData[] memory) {
        uint256 balanceLength = balanceOf(_slimeTokenOwner);
    
        require(balanceLength != 0, 'Owner has no Slime token');

        SlimeMetaData[] memory slimeMetaData = new SlimeMetaData[](balanceLength);

        for (uint256 i = 0; i < balanceLength; i++) {
            uint256 id = tokenOfOwnerByIndex(_slimeTokenOwner, i); // nft id

            
            string memory genes = slimes[id].genes;
            uint256 fatherTokenId = slimes[id].fatherTokenId;
            uint256 motherTokenId = slimes[id].motherTokenId;
            string memory slimeType = slimes[id].slimeType; 
            uint256 health = slimes[id].health; 
            uint256 attack = slimes[id].attack;

            uint256 price = slimeSaleAddress.slimeTokenPrices(id);

            slimeMetaData[i] = SlimeMetaData(
                id,
                genes,
                slimeType,
                fatherTokenId,
                motherTokenId,
                health,
                attack,
                price
            );
        }

        return slimeMetaData;
    }
    
}