// Type Aliases
export type NFT = {
  id: string;
  type: string;
  attack: number;
  price: string;
};

export interface NFTCardProps {
  id: string;
  type: string;
  health: number;
  attack: number;
  price: string;
}

export interface ISlimeMetaData {
  _id: string;
  _genes: string;
  _type: string;
  _fatherTokenId: number;
  _motherTokenId: number;
  _health: number;
  _attack: number;
  _price: string;
}
