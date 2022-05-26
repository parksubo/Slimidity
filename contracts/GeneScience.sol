// SPDX-License-Identifier: MIT
// remixd -s . --remix-ide https://remix.ethereum.org
pragma solidity ^0.8.0;

contract Constants {
    uint256 internal constant MAX = 999;
    uint256 internal constant GENE_LENGTH = 9;
}

contract GeneScience is Constants {
    // 세가지 요소 합쳐서 리턴: Type + Health + Attack -> newGene
    function mixGeneReturnAll(string memory _fatherGene, string memory _motherGene) internal view returns (string memory, string memory, uint256, uint256) {
        string memory newGene;
        string memory newType;
        uint256 newHealth;
        uint256 newAttack;

        newType = mixGeneReturnType(_fatherGene, _motherGene);
        newHealth = mixGeneReturnHealth(_fatherGene, _motherGene);
        newAttack = mixGeneReturnAttack(_fatherGene, _motherGene);

        // strcmp
        if(keccak256(bytes(newType)) == keccak256(bytes("green"))) {
            newGene = "000";
        }
        else if(keccak256(bytes(newType)) == keccak256(bytes("pink"))) {
            newGene = "001";
        }
        else {
            newGene = "002";

        }

        // string concat
        string memory temp;
        temp = string(bytes.concat(bytes(uint2str(newHealth)), bytes(uint2str(newAttack))));
        newGene = string(bytes.concat(bytes(newGene), bytes(temp)));   

        return (newGene, newType, newHealth, newAttack);
    }
    
    // father mother 유전자 받아서 타입 리턴: bytes1
    function mixGeneReturnType(string memory _fatherGene, string memory _motherGene) internal view returns (string memory) {
        bool a = isGeneScience(_fatherGene);
        bool b = isGeneScience(_motherGene);
        require(a&&b, "Invalid gene");

        bytes memory _fatherGeneBytes = bytes(_fatherGene);
        bytes memory _motherGeneBytes = bytes(_motherGene);
        // 0이면 father 1이면 mother 2이면 mutation(미구현)
        //string memory newType;
        bytes1 tempType;
        string memory newType;

        // 타입 결정, 0이면 father, 1이면 mother 유전자에 따른 타입 결정
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, MAX))) % 2;  
        if(randomNumber == 0) {
            tempType = _fatherGeneBytes[2];
        }
        else {
            tempType = _motherGeneBytes[2];
        }

        if(tempType == "0") {
            newType = "green";
        }
        else if(tempType == "1") {
            newType = "pink";
        }
        else { 
            newType = "blue";
        }

        return newType;
    }

    // father mother 유전자 받아서 체력 리턴: uint256
    function mixGeneReturnHealth(string memory _fatherGene, string memory _motherGene) internal view returns (uint256) {
        bool a = isGeneScience(_fatherGene);
        bool b = isGeneScience(_motherGene);
        require(a&&b, "Invalid gene");
        bytes memory _fatherGeneBytes = bytes(_fatherGene);
        bytes memory _motherGeneBytes = bytes(_motherGene);
        uint256 newHealth;
        bytes memory tempBytes1 = new bytes(3);
        bytes memory tempBytes2 = new bytes(3);
        uint256 tempInt1;
        uint256 tempInt2;
        for(uint256 i = 3; i < 6; i++) {
            tempBytes1[i-3] = _fatherGeneBytes[i];
            tempBytes2[i-3] = _motherGeneBytes[i];
        }
        tempInt1 = bytesToUint256(tempBytes1);
        tempInt2 = bytesToUint256(tempBytes2);   
        // tempInt1 과 tempInt2 중 더 큰 값이 tempInt1로 만들기 위한 swap
        swapLeftBigger(tempInt1, tempInt2);
        //father mother중 능력치가 더 높은 곳 의 20퍼센트 , 낮은곳의 20퍼센트 안에서 랜덤 추출
        tempInt1 = (tempInt1 * 120)/100;
        tempInt2 = (tempInt2 * 80)/100;
        uint256 gap = tempInt1 - tempInt2;
        uint256 randomNumber = (uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, MAX))) % gap) + tempInt2;
        // 최솟값은 100으로 유지
        if(randomNumber <= 100) {
            randomNumber = 100;
        }
        newHealth = randomNumber;
        
        return newHealth;
    }

     // father mother 유전자 받아서 공격력 리턴: uint256
    function mixGeneReturnAttack(string memory _fatherGene, string memory _motherGene) internal view returns (uint256) {
        bool a = isGeneScience(_fatherGene);
        bool b = isGeneScience(_motherGene);
        require(a&&b, "Invalid gene");

        bytes memory _fatherGeneBytes = bytes(_fatherGene);
        bytes memory _motherGeneBytes = bytes(_motherGene);
        uint256 newAttack;
        bytes memory tempBytes1 = new bytes(3);
        bytes memory tempBytes2 = new bytes(3);

        uint256 tempInt1;
        uint256 tempInt2;
        for(uint256 i = 6; i < 9; i++) {
            tempBytes1[i-6] = _fatherGeneBytes[i];
            tempBytes2[i-6] = _motherGeneBytes[i];
        }
        tempInt1 = bytesToUint256(tempBytes1);
        tempInt2 = bytesToUint256(tempBytes2);
        // tempInt1 과 tempInt2 중 더 큰 값이 tempInt1로 만들기 위한 swap
        swapLeftBigger(tempInt1, tempInt2);
        //father mother중 능력치가 더 높은 곳 의 10퍼센트 , 낮은곳의 10퍼센트 안에서 랜덤 추출
        tempInt1 = (tempInt1 * 110)/100;
        tempInt2 = (tempInt2 * 90)/100;
        uint256 gap = tempInt1 - tempInt2;
        uint256 randomNumber = (uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, MAX))) % gap) + tempInt2;
        // 최솟값은 100으로 유지
        if(randomNumber <= 100) {
            randomNumber = 100;
        }
        newAttack = randomNumber;
        
        return newAttack;
    }

    // bytes로 유전자 정보를 받아 길이가 9인지 확인하는 함수
    function isGeneScience(string memory _genes) internal pure returns (bool) {
        bytes memory byteGenes = bytes(_genes);
        return byteGenes.length == GENE_LENGTH;
    }

    // uint를 string으로 바꿔주는 함수
    // https://github.com/provable-things/ethereum-api/blob/master/provableAPI_0.6.sol
    function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return '0';
        }

        uint256 j = _i;
        uint256 len;

        while (j != 0) {
            len++;
            j /= 10;
        }

        bytes memory bstr = new bytes(len);
        uint256 k = len;

        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }

        return string(bstr);
    }

    // 항상 왼쪽이 uint value가 더 크게 만들어주는 함수
    function swapLeftBigger(uint256 a, uint256 b) public pure returns (uint256, uint256) {
        uint256 c;
        if(a < b) {
            c = a;
            a = b;
            b = c;
        }
        return (a, b);
    }

    // bytes -> uint256
    function bytesToUint256(bytes memory b) public pure returns (uint256){
        uint256 number = 0;     
        for(uint i=0; i<3; i++){
            number = number + uint8(b[i]) - 48;
            if(i < 2) {
                number = number * 10;
            }
        }       
        return number;
    }
}