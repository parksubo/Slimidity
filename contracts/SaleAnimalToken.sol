// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MintAnimalToken.sol";

contract SaleAnimalToken {
    MintAnimalToken public mintAnimalTokenAddress;

    constructor (address _mintAnimalTokenAddress) {
        // MintAnimalToken을 deploy한 address를 담는다
        mintAnimalTokenAddress = MintAnimalToken(_mintAnimalTokenAddress);
    }

    // animalTokenId => price
    mapping(uint256 => uint256) public animalTokenPrices;

    // 판매중인 token을 저장: FrontEnd에서 사용
    uint256[] public onSaleAnimalTokenArray;

    // 판매등록
    function setForSaleAnimalToken(uint256 _animalTokenId, uint256 _price) public {
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        // 조건검사
        require(animalTokenOwner == msg.sender, "Caller is not animal token owner.");
        require(_price > 0, "Price is zero or lower");
        require(animalTokenPrices[_animalTokenId] == 0, "This animal token is already on sale");
        // animalTokenOwner가 SaleAnimalToken Contract (address(this))에 판매권한을 주었는지 확인 
        require(mintAnimalTokenAddress.isApprovedForAll(animalTokenOwner, address(this)), "Animal token owner did not approve token.");

        animalTokenPrices[_animalTokenId] = _price;

        onSaleAnimalTokenArray.push(_animalTokenId);
    }

    // 구매함수
    // payable
    function purchaseAnimalToken(uint256 _animalTokenId) public payable {
        uint256 price = animalTokenPrices[_animalTokenId];

        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        require(price > 0, "Token is not on sale");
        require(msg.value < price, "Caller has not enough money.");
        require(msg.sender != animalTokenOwner, "Caller is animal token's owner.");

        payable(animalTokenOwner).transfer(msg.value);
        mintAnimalTokenAddress.safeTransferFrom(animalTokenOwner, msg.sender, _animalTokenId);

        animalTokenPrices[_animalTokenId] = 0;
        for (uint256 i = 0; i < onSaleAnimalTokenArray.length; i++) {
            if(animalTokenPrices[onSaleAnimalTokenArray[i]] == 0) {
                onSaleAnimalTokenArray[i] = onSaleAnimalTokenArray[onSaleAnimalTokenArray.length - 1];
                onSaleAnimalTokenArray.pop();
            }
        }
    }

    // frontend
    function getOnSaleAnimalTokenArrayLength() view public returns (uint256) {
        return onSaleAnimalTokenArray.length;
    }
}