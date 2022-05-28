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
  health: string;
  attack: string;
  price: string;
}

export interface ISlimeMetaData {
  _id: string;
  _genes: string;
  _type: string;
  _fatherTokenId: string;
  _motherTokenId: string;
  _health: string;
  _attack: string;
  _price: string;
}
