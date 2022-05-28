// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import 'hardhat/console.sol';
import './SlimeBase.sol';

contract SlimeSale {
    SlimeBase public slimeBaseAddress;

    constructor (address _slimeBaseAddress) {
        slimeBaseAddress = SlimeBase(_slimeBaseAddress);
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
    
    // SlimeTokenId => price
    mapping(uint256 => uint256) public slimeTokenPrices;

    // 판매중인 token을 저장: FrontEnd에서 사용
    uint256[] public onSaleSlimeTokenArray;

    // 판매 등록
    function setForSaleSlimeToken(uint256 _tokenId, uint256 _price) public {
        address tokenOwner = slimeBaseAddress.ownerOf(_tokenId);

        // 조건검사
        require(tokenOwner == msg.sender, "Caller is not slime token owner.");
        require(_price > 0, "Price is zero or lower");
        require(slimeTokenPrices[_tokenId] == 0, "This slime token is already on sale");
        require(slimeBaseAddress.isApprovedForAll(tokenOwner, address(this)), "Slime token owner did not approve token.");

        slimeTokenPrices[_tokenId] = _price;

        onSaleSlimeTokenArray.push(_tokenId);
    }

    // 구매함수 
    function purchaseSlimeToken(uint256 _tokenId) external payable {
        // 판매 등록되어 있는 가격 불러오기 
        uint256 price = slimeTokenPrices[_tokenId];
        address tokenOwner = slimeBaseAddress.ownerOf(_tokenId);
        // 가격이 0이하인 경우
        require(price > 0, "Token is not on sale");
        // 구매자가 돈이 충분하지 않은 경우
        require(price <= msg.value, "Caller sent lower than price.");
        // 사려는 사람이 이미 소유자인 경우
        require(tokenOwner != msg.sender, "Caller is animal token's owner.");

        // 토큰 소유자에게 이더 보내기
        payable(tokenOwner).transfer(msg.value);
        // slime 소유권 넘겨주기(tokenOwner -> msg.sender)
        slimeBaseAddress.safeTransferFrom(tokenOwner, msg.sender, _tokenId);
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

        // 판매 취소
    function cancelSaleSlimeToken(uint256 _tokenId) public { 
        require(slimeTokenPrices[_tokenId] > 0, "This slime token is not on sale");

        // 판매 취소 했으므로 가격 초기화
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

            (string memory genes, uint256 fatherTokenId, uint256 motherTokenId, string memory slimeType, uint256 health, uint256 attack) = slimeBaseAddress.slimes(id);
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

    // 타입에 맞게 판매중인 슬라임 목록 리턴
    function getSlimeTokensOnSaleByType(string memory _slimeType) view public returns (SlimeMetaData[] memory) {
        uint256 onSaleSlimeTokenLength = onSaleSlimeTokenArray.length;
        SlimeMetaData[] memory slimeMetaData = new SlimeMetaData[](onSaleSlimeTokenLength);

        for(uint256 i = 0; i < onSaleSlimeTokenLength; i++) {
            uint256 id = onSaleSlimeTokenArray[i];

            (string memory genes, uint256 fatherTokenId, uint256 motherTokenId, string memory slimeType, uint256 health, uint256 attack) = slimeBaseAddress.slimes(id);
            uint256 price = slimeTokenPrices[id];

            if (equals(_slimeType, slimeType)) break;
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

    // 공격력 범위 맞게 판매중인 슬라임 목록 리턴
    // min <= attack <= max
    function getSlimeTokensOnSaleByAttackRange(uint256 min, uint256 max) view public returns (SlimeMetaData[] memory) {
        uint256 onSaleSlimeTokenLength = onSaleSlimeTokenArray.length;
        SlimeMetaData[] memory slimeMetaData = new SlimeMetaData[](onSaleSlimeTokenLength);

        for(uint256 i = 0; i < onSaleSlimeTokenLength; i++) {
            uint256 id = onSaleSlimeTokenArray[i];

            (string memory genes, uint256 fatherTokenId, uint256 motherTokenId, string memory slimeType, uint256 health, uint256 attack) = slimeBaseAddress.slimes(id);
            uint256 price = slimeTokenPrices[id];

            if (attack < min || attack > max) break;
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

    // string 비교
    function equals(string memory a, string memory b) internal pure returns (bool) {
        if(bytes(a).length != bytes(b).length) {
            return false;
        } else {
            return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
        }
    }
}