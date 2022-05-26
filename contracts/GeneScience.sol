// SPDX-License-Identifier: MIT
// remixd -s . --remix-ide https://remix.ethereum.org
pragma solidity ^0.8.0;

contract Constants {
    uint256 internal constant HUNDRED = 100;
    uint256 internal constant GENE_LENGTH = 9;
}

contract GeneScience is Constants {
    function mixGene(string memory _fatherGene, string memory _motherGene) internal view returns (string memory) {
        bool a = isGeneScience(_fatherGene);
        bool b = isGeneScience(_motherGene);
        require(a&&b, "Invalid gene");

        bytes memory _fatherGeneBytes = bytes(_fatherGene);
        bytes memory _motherGeneBytes = bytes(_motherGene);
        bytes memory newGene = new bytes(GENE_LENGTH);

        // solidity에서 random 만들기
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, HUNDRED))) % 2;
        
        if(randomNumber == 0) {
            newGene = "000100010";
        }
        else {
            newGene = "001100010";
        }

        return string(newGene);
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
}