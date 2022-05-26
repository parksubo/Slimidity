// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import 'hardhat/console.sol';
import './SlimeBase.sol';
import './SlimeBreed.sol';

contract SlimeSale is SlimeBase {
  
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
        require(price > 0, "Token is not on sale");
        // 구매자가 돈이 충분하지 않은 경우
        require(price <= msg.value, "Caller sent lower than price.");
        // 사려는 사람이 이미 소유자인 경우
        require(tokenOwner != msg.sender, "Caller is animal token's owner.");

        // 토큰 소유자에게 이더 보내기
        payable(tokenOwner).transfer(msg.value);
        // slime 소유권 넘겨주기(tokenOwner -> msg.sender)
        safeTransferFrom(tokenOwner, msg.sender, _tokenId);
        // 판매 했으므로 가격 초기화
        slimeTokenPrices[_tokenId] = 0;

        for (uint256 i = 0; i < onSaleSlimeTokenArray.length; i++) {
            _tokenId = onSaleSlimeTokenArray[i];
            if(slimeTokenPrices[_tokenId] == 0) {
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
                id,genes,
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