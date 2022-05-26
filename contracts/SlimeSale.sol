// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import 'hardhat/console.sol';
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import './SlimeBase.sol';
import './SlimeBreed.sol';

contract SlimeSale is SlimeBase {

    SlimeBreed public slimeBreedAddress;

    constructor(address _slimeBreedAddress) {
        slimeBreedAddress = SlimeBreed(_slimeBreedAddress);
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

    // SlimeTokenId => price
    mapping(uint256 => uint256) public slimeTokenPrices;

    // 판매중인 token을 저장: FrontEnd에서 사용
    uint256[] public onSaleSlimeTokenArray;

    // 판매 등록
    function setForSaleSlimeToken(uint256 _tokenId, uint256 _price) public {
        address tokenOwner = ownerOf(_tokenId);

        // 조건검사
        require(tokenOwner == msg.sender, "Caller is not slime token owner.");
        require(_price > 0, "Price is zero or lower");
        require(slimeTokenPrices[_tokenId] == 0, "This slime token is already on sale");
        //require(mintSlimeTokenAddress.isApprovedForAll(tokenOwner, address(this)), "Slime token owner did not approve token.");

        slimeTokenPrices[_tokenId] = _price;

        onSaleSlimeTokenArray.push(_tokenId);
    }

    // 구매함수 
    function purchaseSlimeToken(uint256 _tokenId) external payable {
        // 판매 등록되어 있는 가격 불러오기 
        uint256 price = slimeTokenPrices[_tokenId];
        address tokenOwner = ownerOf(_tokenId);
        // 가격이 0이하인 경우
        require(price <= 0, "Token is not on sale");
        // 구매자가 돈이 충분하지 않은 경우
        require(msg.value < price, "Caller has not enough money.");
        // 사려는 사람이 이미 소유자인 경우
        require(tokenOwner != msg.sender, 'Avoid self purchase');
        // 토큰이 배포자에게 있을 경우
        require(tokenOwner == deployer, 'Purchase only from deployer');

        // 사려는 사람에게 소유권 추가
        addOwnerShip(msg.sender, _tokenId);
        // 토큰 소유자에게 이더 보내기
        payable(tokenOwner).transfer(msg.value);
        // 토큰 소유자로부터 소유권 박탈 (-1로 초기화)
        ownersTokenIdAtIndex[tokenOwner][_tokenId] = -1;
        // 판매 했으므로 가격 초기화
        slimeTokenPrices[_tokenId] = 0;

        for (uint256 i = 0; i < onSaleSlimeTokenArray.length; i++) {
            uint256 tokenId = onSaleSlimeTokenArray[i];
            if(slimeTokenPrices[tokenId] == 0) {
                onSaleSlimeTokenArray[i] = onSaleSlimeTokenArray[onSaleSlimeTokenArray.length - 1];
                onSaleSlimeTokenArray.pop();
            }
        }
    }

    // 프론트에서 판매중인 슬라임 토큰 갯수 보기 위한 함수
    function getOnSaleSlimeTokenArrayLength() view public returns (uint256) {
        return onSaleSlimeTokenArray.length;
    }

    // 현재 판매중인 슬라임 목록 리턴하는 함수
    function getSlimeTokensOnSale() view public returns (SlimeMetaData[] memory) {
        uint256 onSaleSlimeTokenLength = onSaleSlimeTokenArray.length;
        SlimeMetaData[] memory slimeMetaData = new SlimeMetaData[](onSaleSlimeTokenLength);

        for(uint256 i = 0; i < onSaleSlimeTokenLength; i++) {
            uint256 id = onSaleSlimeTokenArray[i];

            string memory genes = slimes[id].genes;
            uint256 fatherTokenId = slimes[id].fatherTokenId;
            uint256 motherTokenId = slimes[id].motherTokenId;
            string memory slimeType = slimes[i].slimeType; 
            uint256 health = slimes[id].health;
            uint256 attack = slimes[id].attack;
            uint256 price = slimeTokenPrices[id];

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
    /*
    // 프론트에서 슬라임 정보 보기 위한 함수
    function getSlimeByTokenId(uint256 _tokenId) public view returns (
            string memory _genes,
            string memory _type,
            uint256 _fatherTokenId,
            uint256 _motherTokenId,
            uint256 _health,
            uint256 _attack
        )   {
 
        _genes = slimes[_tokenId].genes;
        _type = slimes[_tokenId].slimeType;
        _fatherTokenId = slimes[_tokenId].fatherTokenId;
        _motherTokenId = slimes[_tokenId].motherTokenId;
        _health = slimes[_tokenId].health;
        _attack = slimes[_tokenId].attack;

        return (_genes, _type, _fatherTokenId,_motherTokenId,_health,_attack);
    }

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
            uint256 price = slimeTokenPrices[id];

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
    */
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
            uint256 price = slimeTokenPrices[id];

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
    /*    
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
    */
}