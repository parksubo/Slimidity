import React, { FC, useState } from 'react';
import NFTCard from '../../components/Breeding/NFTCard';
import styles from './Breeding.module.css';

function isEmptyObj(obj: Object): boolean {
  if (obj === undefined) return true;
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

// Type Aliases
type NFT = {
  id: string;
  type: string;
  attack: number;
  price: number;
};

const Breeding: FC = () => {
  const [nfts, setNfts] = useState<Array<NFT>>([
    { id: '1', type: 'ice', attack: 1, price: 0.1 },
    { id: '2', type: 'fire', attack: 2, price: 0.3 },
    { id: '3', type: 'wind', attack: 4, price: 0.9 },
    { id: '4', type: 'ice', attack: 3, price: 1.4 },
  ]); // 추후 contract에서 nft받아오기
  const [clicked, setClicked] = useState<Array<NFT>>([]); // 선택한 카드

  const onClickCard = (e: React.MouseEvent<HTMLInputElement>) => {
    const id: string = e.currentTarget.getAttribute('data-id')!;
    const nft: NFT = nfts.find((nft) => nft.id === id)!;

    let newClicked: Array<NFT> = [...clicked];
    if (newClicked.length == 0) {
      newClicked.push(nft);
    } else if (newClicked.length == 1 && newClicked[0].id !== id) {
      newClicked.push(nft);
    }
    setClicked(newClicked);
  };

  const isCardClicked = (nft: NFT): boolean => {
    for (let i = 0; i < clicked.length; i++) {
      if (clicked[i].id === nft.id) return true;
    }
    return false;
  };
  const onClickBreedingCard = (e: React.MouseEvent<HTMLInputElement>) => {
    const id: string = e.currentTarget.getAttribute('data-id')!;
    let newClicked: Array<NFT> = clicked.filter((nft) => nft.id !== id);

    setClicked(newClicked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftHeader}>
          <span>카드 두개를 선택해서 브리딩을 수행해보세요</span>
        </div>
        <div className={styles.cards}>
          {nfts.map((nft) => (
            <div
              className={
                isCardClicked(nft)
                  ? `${styles.card} ${styles.clicked}`
                  : `${styles.card}`
              }
              key={nft.id}
              data-id={nft.id}
              onClick={onClickCard}
            >
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
      <div className={styles.right}>
        <div className={styles.rightHeader}>
          <span>브리딩 장소</span>
        </div>
        <div className={styles.breedingPlace}>
          {isEmptyObj(clicked[0]) ? (
            <div className={styles.clickedCard}></div>
          ) : (
            <div
              className={styles.clickedCard}
              onClick={onClickBreedingCard}
              data-id={clicked[0].id}
            >
              <NFTCard
                id={clicked[0].id}
                type={clicked[0].type}
                attack={clicked[0].attack}
                price={clicked[0].price}
              />
            </div>
          )}
          <img
            src={require('../../images/heart.png')}
            className={styles.heartImg}
          />
          {isEmptyObj(clicked[1]) ? (
            <div className={styles.clickedCard}></div>
          ) : (
            <div
              className={styles.clickedCard}
              onClick={onClickBreedingCard}
              data-id={clicked[1].id}
            >
              <NFTCard
                id={clicked[1].id}
                type={clicked[1].type}
                attack={clicked[1].attack}
                price={clicked[1].price}
              />
            </div>
          )}
        </div>
        <div className={styles.breedingBtn}>
          <button className="btn btn-outline-secondary">브리딩 하기</button>
        </div>
      </div>
    </div>
  );
};

export default Breeding;
