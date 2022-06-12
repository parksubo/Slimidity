import { AbiItem } from 'web3-utils';
import Web3 from 'web3';

// remix에서 abi복사하여 붙여넣기

const GeneScienceAbi: AbiItem[] = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_genes',
        type: 'string',
      },
    ],
    name: 'isGeneScience',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_fatherGene',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_motherGene',
        type: 'string',
      },
    ],
    name: 'mixGeneReturnAll',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const SlimeBaseAbi: AbiItem[] = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_geneScienceAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'baseUri',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_genes',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_fatherTokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_motherTokenId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_slimeType',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_health',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_attack',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'createSlime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'deployer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'geneScienceAddress',
    outputs: [
      {
        internalType: 'contract GeneScience',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getContractBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_slimeTokenOwner',
        type: 'address',
      },
    ],
    name: 'getSlimeTokensByAccount',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: '_id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_genes',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_type',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_fatherTokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_motherTokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_health',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_attack',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_price',
            type: 'uint256',
          },
        ],
        internalType: 'struct SlimeBase.SlimeMetaData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'ownersTokenIds',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_slimeSaleAddress',
        type: 'address',
      },
    ],
    name: 'setSlimeSaleAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'slimeIndexTracker',
    outputs: [
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'slimeSaleAddress',
    outputs: [
      {
        internalType: 'contract SlimeSale',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'slimes',
    outputs: [
      {
        internalType: 'string',
        name: 'genes',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'fatherTokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'motherTokenId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'slimeType',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'health',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'attack',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'tokenByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const SlimeBreedAbi: AbiItem[] = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_geneScienceAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_slimeBaseAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_slimeSaleAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'genes',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fatherTokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'motherTokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'slimeType',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'health',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'attack',
        type: 'uint256',
      },
    ],
    name: 'Birth',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_fatherTokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_motherTokenId',
        type: 'uint256',
      },
    ],
    name: 'breedslimes',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'Received',
    type: 'event',
  },
  {
    inputs: [],
    name: 'geneScienceAddress',
    outputs: [
      {
        internalType: 'contract GeneScience',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'getSlimeByTokenId',
    outputs: [
      {
        internalType: 'string',
        name: 'genes',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'fatherTokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'motherTokenId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'slimeType',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'health',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'attack',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'slimeBaseAddress',
    outputs: [
      {
        internalType: 'contract SlimeBase',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'slimeSaleAddress',
    outputs: [
      {
        internalType: 'contract SlimeSale',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const SlimeSaleAbi: AbiItem[] = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_slimeBaseAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'cancelSaleSlimeToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOnSaleSlimeTokenArrayLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getSlimeTokensOnSale',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: '_id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_genes',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_type',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_fatherTokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_motherTokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_health',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_attack',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_price',
            type: 'uint256',
          },
        ],
        internalType: 'struct SlimeSale.SlimeMetaData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'min',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'max',
        type: 'uint256',
      },
    ],
    name: 'getSlimeTokensOnSaleByAttackRange',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: '_id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_genes',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_type',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_fatherTokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_motherTokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_health',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_attack',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_price',
            type: 'uint256',
          },
        ],
        internalType: 'struct SlimeSale.SlimeMetaData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_slimeType',
        type: 'string',
      },
    ],
    name: 'getSlimeTokensOnSaleByType',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: '_id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_genes',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_type',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_fatherTokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_motherTokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_health',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_attack',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_price',
            type: 'uint256',
          },
        ],
        internalType: 'struct SlimeSale.SlimeMetaData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'onSaleSlimeTokenArray',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'purchaseSlimeToken',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
    ],
    name: 'setForSaleSlimeToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'slimeBaseAddress',
    outputs: [
      {
        internalType: 'contract SlimeBase',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'slimeTokenPrices',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

// remix에서 polygon mumbai testnet에 배포하여 생기는 컨트랙트 주소 붙여넣기
const GeneScienceAddress = '0x40751161F7B2E650F10b562F6CfC1b305d867fB9';
const SlimeBaseAddress = '0xA88a754d3539D39FA898953CFcF61F7ef33cB507';
const SlimeBreedAddress = '0xD2C1D62E8b55dbE2E9790F9C1359964Ed48D16Ae';
export const SlimeSaleAddress = '0xb7c139710BC49133E50f6f13115e0E47587F171B';

// metamask 연동
export const web3 = new Web3(window.ethereum);

export const GeneScienceContract = new web3.eth.Contract(
  GeneScienceAbi,
  GeneScienceAddress
);

export const SlimeBaseContract = new web3.eth.Contract(
  SlimeBaseAbi,
  SlimeBaseAddress
);

export const SlimeBreedContract = new web3.eth.Contract(
  SlimeBreedAbi,
  SlimeBreedAddress
);

export const SlimeSaleContract = new web3.eth.Contract(
  SlimeSaleAbi,
  SlimeSaleAddress
);
