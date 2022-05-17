import React, { FC } from 'react';
import NFTCard from '../../components/Breeding/NFTCard';
import styles from './Breeding.module.css';

const Breeding: FC = () => {
  const nfts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 추후 contract에서 nft받아오기
  const clicked = [0, 0]; // 선택한 카드
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftHeader}>
          <span>카드 두개를 선택해서 브리딩을 수행해보세요</span>
        </div>
        <div className={styles.cards}>
          {nfts.map((nft) => (
            <div className={styles.card}>
              <NFTCard />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightHeader}>
          <span>브리딩 장소</span>
        </div>
        <div className={styles.breedingPlace}>
          <div className={styles.clickedCard}>
            <NFTCard />
          </div>
          <img
            src={require('../../images/heart.png')}
            className={styles.heartImg}
          />
          <div className={styles.clickedCard}>
            <NFTCard />
          </div>
        </div>
        <div className={styles.breedingBtn}>
          <button className="btn btn-outline-secondary">브리딩 하기</button>
        </div>
      </div>
    </div>
  );
};

export default Breeding;
