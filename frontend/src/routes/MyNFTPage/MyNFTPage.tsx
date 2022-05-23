import React, { FC, useState } from 'react';
import NFTCard from '../../components/MyNFTPage/NFTCard';
import styles from './MyNFTPage.module.css';
import { NFT } from '../../common/DataTypes';

const MyNFTPage: FC = () => {
  const [nfts, setNfts] = useState<Array<NFT>>([
    { id: '1', type: 'ice', attack: 1, price: 0 },
    { id: '2', type: 'fire', attack: 2, price: 0 },
    { id: '3', type: 'wind', attack: 4, price: 0.9 },
    { id: '4', type: 'ice', attack: 3, price: 1.4 },
  ]); // 추후 contract에서 nft받아오기

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>NFT를 판매하거나 판매취소할 수 있습니다.</span>
      </div>
      <div className={styles.cards}>
        {nfts.map((nft) => (
          <div className={styles.card} key={nft.id} data-id={nft.id}>
            <NFTCard
              id={nft.id}
              type={nft.type}
              attack={nft.attack}
              price={nft.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNFTPage;
