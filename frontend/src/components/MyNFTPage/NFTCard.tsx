import React, { ChangeEvent, FC, useState } from 'react';
import styles from './NFTCard.module.css';

interface INFTCardProps {
  id: string;
  type: string;
  attack: number;
  price: number;
}

const NFTCard: FC<INFTCardProps> = ({ id, type, attack, price }) => {
  const [sellPrice, setSellPrice] = useState<number>(price);

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(parseInt(e.target.value));
  };

  return (
    <div className={styles.container}>
      <span>id: {id}</span>
      <img src={require('../../images/IceSlime.png')} className={styles.img} />
      <div className={styles.metadata}>
        {price > 0 && <span>가격: {price} ether</span>}
        <span>타입: {type}</span>
        <span>공격력: {attack}</span>
      </div>
      {price > 0 ? (
        <button className={styles.cancelButton}>판매취소</button>
      ) : (
        <div className={styles.sellContainer}>
          <div className={styles.inputContainer}>
            <input type="number" value={sellPrice} onChange={onPriceChange} />
            <div>
              <span>ether</span>
            </div>
          </div>
          {/* <button className={styles.sellButton} onClick={onClickSell}> */}
          <button className={styles.sellButton}>판매하기</button>
        </div>
      )}
    </div>
  );
};

export default NFTCard;
