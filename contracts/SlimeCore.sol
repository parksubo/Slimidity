// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import 'hardhat/console.sol';
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import './SlimeBase.sol';

contract SlimeCore is SlimeBase {

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

    // 이더를 받기위한 fallback 함수 (external, payable 필수)
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    // SlimeTokenId => price
    mapping(uint256 => uint256) public slimeTokenPrices;

    // 판매중인 token을 저장: FrontEnd에서 사용
    uint256[] public onSaleSlimeTokenArray;

    function setForSaleSlimeToken(uint256 tokenId) public {
        // 판매 등록되어 있는 가격 불러오기 
        uint256 price = slimeTokenPrices[tokenId];
        address tokenOwner = ownerOf(tokenId);

        // 조건검사
        require(tokenOwner == msg.sender, "Caller is not slime token owner.");
        require(price > 0, "Price is zero or lower");
        require(slimeTokenPrices[tokenId] == 0, "This slime token is already on sale");
        //require(mintSlimeTokenAddress.isApprovedForAll(tokenOwner, address(this)), "Slime token owner did not approve token.");

        slimeTokenPrices[tokenId] = price;

        onSaleSlimeTokenArray.push(tokenId);
    }

    // 구매함수 
    function purchaseSlimeToken(uint256 tokenId) external payable {
        // 판매 등록되어 있는 가격 불러오기 
        uint256 price = slimeTokenPrices[tokenId];
        address tokenOwner = ownerOf(tokenId);
        // 가격이 0이하인 경우
        require(price <= 0, "Token is not on sale");
        // 구매자가 돈이 충분하지 않은 경우
        require(msg.value < price, "Caller has not enough money.");
        // 사려는 사람이 이미 소유자인 경우
        require(tokenOwner != msg.sender, 'Avoid self purchase');
        // 토큰이 배포자에게 있을 경우
        require(tokenOwner == deployer, 'Purchase only from deployer');

        // 사려는 사람에게 소유권 추가
        addOwnerShip(msg.sender, tokenId);
        // 토큰 소유자에게 이더 보내기
        payable(tokenOwner).transfer(msg.value);
        // 토큰 소유자로부터 소유권 박탈 (-1로 초기화)
        ownersTokenIdAtIndex[tokenOwner][tokenId] = -1;
    }

    // 프론트에서 판매중인 슬라임 토큰 갯수 보기 위한 함수
    function getOnSaleSlimeTokenArrayLength() view public returns (uint256) {
        return onSaleSlimeTokenArray.length;
    }

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
    }

    // 슬라임 브리딩하는 함수
    function breedslimes(uint256 _fatherTokenId, uint256 _motherTokenId) external {
        require(msg.sender != deployer, 'Disallow deployer to breed');
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


    
    function getTokenIds(address _owner) external view returns (uint256[] memory) {
        // 소유자의 토큰 소지 갯수
        uint256 arrLength = ownersTokenIds[_owner].length;
        uint256[] memory tokens = new uint256[](balanceOf(_owner));
        uint256 tokenIdx = 0;
        
        for (uint256 i = 0; i < arrLength; i++) {
            uint256 tokenId = ownersTokenIds[_owner][i];

            if (int256(ownersTokenIdAtIndex[_owner][tokenId]) != -1) {
                tokens[tokenIdx] = tokenId;
                tokenIdx += 1;
            }
        }

        return tokens;
    }
    function getTokensOfDeployer() external view returns (uint256[] memory) {
        require(deployer != address(0x0), 'Deployer must set first');

        uint256 arrLength = ownersTokenIds[deployer].length;
        uint256[] memory tokens = new uint256[](balanceOf(deployer));
        uint256 tokenIdx = 0;

        for (uint256 i = 0; i < arrLength ; i++) {
            uint256 tokenId = ownersTokenIds[deployer][i];

            if (ownersTokenIdAtIndex[deployer][tokenId] != -1) {
                tokens[tokenIdx] = tokenId;
                tokenIdx += 1;
            }
        }
        return tokens;
    }
}