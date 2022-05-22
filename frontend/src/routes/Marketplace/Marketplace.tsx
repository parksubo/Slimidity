import React, { ChangeEvent, FC, useState } from 'react';
import DropDownSearch from '../../components/Marketplace/DropDownSearch';
import NFTCard from '../../components/Marketplace/NFTCard';
import { ReactComponent as RightArrowImg } from '../../icons/arrow-right-solid.svg';
import { ReactComponent as LeftArrowImg } from '../../icons/arrow-left-solid.svg';
import { ReactComponent as CaretUp } from '../../icons/caret-up-solid.svg';
import styles from './Marketplace.module.css';
import RangeSlider from '../../components/Marketplace/Filter/RangeSlider';

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

type RangeSlider = {
  value: number[];
  name: string;
};

const NFTsOnChain: NFT[] = [
  { id: '1', type: 'ice', attack: 1, price: 4 },
  { id: '2', type: 'fire', attack: 2, price: 1 },
  { id: '3', type: 'wind', attack: 4, price: 3 },
  { id: '4', type: 'ice', attack: 10, price: 20 },
];

export interface IMarketpalceProps {}

const Marketplace: FC<IMarketpalceProps> = (props) => {
  const [nfts, setNfts] = useState<NFT[]>(NFTsOnChain); // 추후 contract에서 nft받아오기

  const [isTriggerOpen, setIsTriggerOpen] = useState<Filters>({
    type: true,
    attack: true,
  });

  // attack(공격력) filter
  const [attackValue, setAttackValue] = useState<number[]>([0, 20]);

  // 정렬
  // 0: highest price 1: lowest price 2: Latest
  // !!추후수정!! latest는 id가 아닌 실제 mint 시간을 이용해서 정렬해야함.
  const onClickSort = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    const command: string | null = e.currentTarget.getAttribute('data-command');
    let sortedNfts: NFT[] = [...nfts];
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
      let sortedNfts: NFT[] = NFTsOnChain.filter((nft) => nft.type === type);
      setNfts(sortedNfts);
    } else {
      throw new Error('triggerOpen Error');
    }
  };

  const filterNFTsFromRange = (
    min: number,
    max: number,
    NFTArray: NFT[]
  ): NFT[] => {
    let sortedNFTs: NFT[] = NFTArray.filter(
      (nft) => min <= nft.attack && nft.attack <= max
    );
    return sortedNFTs;
  };

  const handleAttackValueChangeSlider = (
    event: Event,
    newValue: number | number[]
  ) => {
    const changedRange: number[] = (event.target as any as RangeSlider).value;
    // 이전 범위와 같은 범위라면(검색 조건 변화가 없다면) 정렬x
    if (JSON.stringify(attackValue) == JSON.stringify(changedRange)) {
      return false;
    }
    setAttackValue(newValue as number[]);

    const [min, max] = changedRange;
    const sortedNFTs = filterNFTsFromRange(min, max, NFTsOnChain);
    setNfts(sortedNFTs);
  };

  const handleAttackValueChangeInput = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const [prevMin, prevMax] = attackValue;
    const inputValue = parseInt(event.currentTarget.value);
    const IsinputValueNumber = !isNaN(inputValue);
    const isMin = event.currentTarget.dataset.hasOwnProperty('min');

    let newAttackValue: number[];
    if (event.currentTarget.value === '') {
      if (isMin) {
        setAttackValue([parseInt(''), prevMax]);
        return;
      } else {
        setAttackValue([prevMin, parseInt('')]);
        return;
      }
    }

    if (IsinputValueNumber) {
      if (isMin) {
        if (inputValue < 0) {
          return false;
        } else {
          newAttackValue = [inputValue, prevMax];
          setAttackValue(newAttackValue);
        }
      } else {
        if (inputValue < 0) {
          return false;
        } else {
          newAttackValue = [prevMin, inputValue];
          setAttackValue(newAttackValue);
        }
      }
      const sortedNFTs = filterNFTsFromRange(
        newAttackValue[0],
        newAttackValue[1],
        NFTsOnChain
      );
      setNfts(sortedNFTs);
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
                <button onClick={onClickTypeFilterBtn} data-name="wind">
                  Wind
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={`${styles.filterContent} ${styles.filterAttack}`}>
          <div className={styles.CollapseTriggerContainer}>
            <button
              className={
                isTriggerOpen.attack
                  ? styles.CollapseBtn
                  : styles.ClickedCollapseBtn
              }
              onClick={onClickCollapseTrigger}
              data-name="attack"
            >
              <CaretUp width="0.8rem" height="2rem" fill="gray" />
            </button>
            <span>Attack</span>
          </div>
          {isTriggerOpen['attack'] ? (
            <div className={styles.CollapseContentContainer}>
              <div className={styles.attackFilter}>
                <RangeSlider
                  attackValue={attackValue}
                  setAttackValue={setAttackValue}
                  handleAttackValueChangeSlider={handleAttackValueChangeSlider}
                  handleAttackValueChangeInput={handleAttackValueChangeInput}
                />
              </div>
            </div>
          ) : (
            ''
          )}
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
