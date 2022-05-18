import React, { FC, useState } from 'react';
import DropDownSearch from '../../components/Marketplace/DropDownSearch';
import NFTCard from '../../components/Marketplace/NFTCard';
import { ReactComponent as RightArrowImg } from '../../icons/arrow-right-solid.svg';
import { ReactComponent as LeftArrowImg } from '../../icons/arrow-left-solid.svg';
import { ReactComponent as CaretUp } from '../../icons/caret-up-solid.svg';
import styles from './Marketplace.module.css';

// Type Aliases
type NFT = {
  id: string;
  type: string;
  attack: number;
  price: number;
};

type Filters = {
  type: boolean;
  attack: boolean;
};
export interface IMarketpalceProps {}

const Marketplace: FC<IMarketpalceProps> = (props) => {
  const [nfts, setNfts] = useState<Array<NFT>>([
    { id: '1', type: 'ice', attack: 1, price: 4 },
    { id: '2', type: 'fire', attack: 2, price: 1 },
    { id: '3', type: 'wind', attack: 4, price: 3 },
    { id: '4', type: 'ice', attack: 10, price: 20 },
  ]); // 추후 contract에서 nft받아오기

  const [isTriggerOpen, setIsTriggerOpen] = useState<Filters>({
    type: true,
    attack: true,
  });

  // 정렬
  // 0: highest price 1: lowest price 2: Latest
  // !!추후수정!! latest는 id가 아닌 실제 mint 시간을 이용해서 정렬해야함.
  const onClickSort = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    const command: string | null = e.currentTarget.getAttribute('data-command');
    let sortedNfts: Array<NFT> = [...nfts];
    switch (command) {
      case '0':
        sortedNfts.sort((a, b) => b.price - a.price);
        break;
      case '1':
        sortedNfts.sort((a, b) => a.price - b.price);
        break;
      case '2':
        sortedNfts.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        break;
      default:
        break;
    }
    setNfts(sortedNfts);
  };

  const onClickCollapseTrigger = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const name: string | null = e.currentTarget.getAttribute('data-name');

    if (name != null) {
      setIsTriggerOpen((prevIsTriggerOpen) => ({
        ...prevIsTriggerOpen,
        [name]: !prevIsTriggerOpen[name as keyof Filters],
      }));
    } else {
      throw new Error('triggerOpen Error');
    }
  };

  const onClickTypeFilterBtn = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const type: string | null = e.currentTarget.getAttribute('data-name');
    if (name != null) {
      setNfts((prevNfts) => {
        let sortedNfts: Array<NFT> = prevNfts.filter(
          (nft) => nft.type === type
        );
        return sortedNfts;
      });
    } else {
      throw new Error('triggerOpen Error');
    }
  };
  return (
    <div className={styles.rootContainer}>
      <div className={styles.left}>
        <div className={`${styles.filterContent} ${styles.filterHeader}`}>
          Filter
        </div>
        <div className={`${styles.filterContent} ${styles.filterType}`}>
          <div className={styles.CollapseTriggerContainer}>
            <button
              className={
                isTriggerOpen.type
                  ? styles.CollapseBtn
                  : styles.ClickedCollapseBtn
              }
              onClick={onClickCollapseTrigger}
              data-name="type"
            >
              <CaretUp width="0.8rem" height="2rem" fill="gray" />
            </button>
            <span>Type</span>
          </div>
          {isTriggerOpen['type'] ? (
            <div className={styles.CollapseContentContainer}>
              <div className={styles.typeFilter}>
                <button onClick={onClickTypeFilterBtn} data-name="ice">
                  Ice
                </button>
                <button onClick={onClickTypeFilterBtn} data-name="fire">
                  Fire
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={`${styles.filterContent} ${styles.filterPower}`}>
          Power
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.listHeader}>
          <span className={styles.slimeCount}>{nfts.length} Slimes</span>
          <div className={styles.filterBtn}>
            <DropDownSearch onClickSort={onClickSort} />
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
