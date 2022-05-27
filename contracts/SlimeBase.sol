// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import 'hardhat/console.sol';

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import '@openzeppelin/contracts/utils/Counters.sol';
import './GeneScience.sol';

contract SlimeBase is ERC721Enumerable {
    using Counters for Counters.Counter;
    GeneScience public geneScienceAddress;

    constructor (address _geneScienceAddress) ERC721('Slimes', 'SLME'){
        geneScienceAddress = GeneScience(_geneScienceAddress);
        baseUri = '';
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
    // 특정 슬라임의 유전자를 가지는 슬라임이 몇 개인지 카운트
    // mapping(string => uint256) public slimeCountPerGene;
    
    /*
    // 배포자 설정
    function setDeployer(address _deployer) internal {
        deployer = _deployer;
    }
    */
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
    ) internal returns (uint256) {
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
        // 해당 유전자를 가진 슬라임 개수++
        // slimeCountPerGene[_genes] += 1;

        return newTokenId;
    }

    // 임시 슬라임 민팅 함수
    function mintGenesisSlime(string memory _genes, string memory _type) external {// external onlyDeployer {
        createSlime(_genes, 0, 0, _type, 100, 10, msg.sender);
    }
    /*
    // 배포자만 사용가능하게
    modifier onlyDeployer() {
        require(deployer != address(0x0), 'Deployer must set first');
        require(msg.sender == deployer, 'Must Deployer');
        _;
    }
    */
}