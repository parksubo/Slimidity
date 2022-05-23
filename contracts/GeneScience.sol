// SPDX-License-Identifier: MIT
// remixd -s . --remix-ide https://remix.ethereum.org
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Constants {
    uint256 internal constant HUNDRED = 100;
    uint256 internal constant GENE_LENGTH = 9;
    //uint256 internal constant GENE_ATTRS = 3;
    //uint256 internal constant MUTATION_CHANCE = 30; // 30%
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
        /*
        bytes memory crossoveredGene = new bytes(GENE_LENGTH);
        uint256 divider = GENE_LENGTH / 2;
        //  Just do a simple crossover gene mixing algorithm
        for (uint256 i = 0; i < divider; i++) {
            crossoveredGene[i + divider + 1] = _fatherGeneBytes[i];
        }

        for (uint256 i = divider; i < GENE_LENGTH; i++) {
            crossoveredGene[i - divider] = _motherGeneBytes[i];
        }
        int256 where = 0;
        int256 attr = 0;

        (where, attr) = mutation();

        //  There is a mutation!
        if (where != -1) {
            string memory attrStr = uint2str(uint256(attr));
            bytes memory bytesAttrStr = bytes(attrStr);

            crossoveredGene[uint256(where)] = bytesAttrStr[0];
        }
        return string(crossoveredGene);
        */
        return string(newGene);
    }

    /*
    //  Apply mock mutation for only 15% chance
    function mutation() internal view returns (int256, int256) {
        
        uint256 randomHash = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, HUNDRED)));

        uint256 randomNumber = randomHash % HUNDRED;
        bool isMutation = randomNumber < MUTATION_CHANCE;

        if (isMutation) {         
            uint256 where = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, HUNDRED)));
            uint256 attr = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, HUNDRED)));

            return (int256(where % GENE_LENGTH), int256(attr % GENE_ATTRS));
        }

        return (-1, -1);
    }
    */
    
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