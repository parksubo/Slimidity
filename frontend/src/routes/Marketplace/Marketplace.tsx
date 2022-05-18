import React, { FC, useState } from 'react';
import DropDownSearch from '../../components/Marketplace/DropDownSearch';
import NFTCard from '../../components/Marketplace/NFTCard';
import { ReactComponent as RightArrowImg } from '../../icons/arrow-right-solid.svg';
import { ReactComponent as LeftArrowImg } from '../../icons/arrow-left-solid.svg';
import styles from './Marketplace.module.css';

// Type Aliases
type NFT = {
  id: string;
  type: string;
  attack: number;
  price: number;
};

export interface IMarketpalceProps {}

const Marketplace: FC<IMarketpalceProps> = (props) => {
  const [nfts, setNfts] = useState<Array<NFT>>([
    { id: '1', type: 'ice', attack: 1, price: 0.1 },
    { id: '2', type: 'fire', attack: 2, price: 0.3 },
    { id: '3', type: 'wind', attack: 4, price: 0.9 },
    { id: '4', type: 'ice', attack: 3, price: 1.4 },
  ]); // 추후 contract에서 nft받아오기

  return (
    <div className={styles.rootContainer}>
      <div className={styles.left}>
        <div className={`${styles.filterContent} ${styles.filterHeader}`}>
          Filter
        </div>
        <div className={`${styles.filterContent} ${styles.filterType}`}>
          Type
        </div>
        <div className={`${styles.filterContent} ${styles.filterPower}`}>
          Power
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.listHeader}>
          <span className={styles.slimeCount}>123,423 Slimes</span>
          <div className={styles.filterBtn}>
            <DropDownSearch />
          </div>
        </div>
        <div className={styles.cardList}>
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
        <div className={styles.PaginationContainer}>
          <button className={styles.PaginationBtn}>
            <LeftArrowImg width="1rem" height="2rem" fill="white" />
          </button>
          <span className={styles.PaginationText}>Page</span>
          <form>1</form>
          <span className={styles.PaginationText}>of 4,773</span>
          <button className={styles.PaginationBtn}>
            <RightArrowImg width="1rem" height="2rem" fill="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
