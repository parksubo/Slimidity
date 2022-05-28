import React, { ChangeEvent, FC, useContext, useState } from 'react';
import styles from './NFTCard.module.css';
import { NFTCardProps } from '../../common/DataTypes';
import { accountContext } from '../../App';
import { SlimeSaleContract, web3 } from '../../contracts';

const NFTCard: FC<NFTCardProps> = ({ id, type, health, attack, price }) => {
  const { account } = useContext(accountContext);
  const [sellPrice, setSellPrice] = useState<string>(price);
  const [inputPrice, setInputPrice] = useState<string>(price);

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPrice(e.target.value);
  };

  const onClickSell = async () => {
    if (!account) return;

    const response = await SlimeSaleContract.methods //
      .setForSaleSlimeToken(id, web3.utils.toWei(inputPrice, 'ether'))
      .send({ from: account });

    if (response.status) {
      // toWei로 set해야 fromWei할때 형변환 에러나지 않는다.
      setSellPrice(web3.utils.toWei(inputPrice, 'ether'));
    }
  };

  return (
    <div className={styles.container}>
      <span>id: {id}</span>
      <img src={require('../../images/IceSlime.png')} className={styles.img} />
      <div className={styles.metadata}>
        {sellPrice !== '0' && (
          <span>{`가격: ${web3.utils.fromWei(sellPrice)} ether`}</span>
        )}
        <span>타입: {type}</span>
        <span>체력: {health}</span>
        <span>공격력: {attack}</span>
      </div>
      {sellPrice !== '0' ? (
        <button className={styles.cancelButton}>판매취소</button>
      ) : (
        <div className={styles.sellContainer}>
          <div className={styles.inputContainer}>
            <input type="number" value={inputPrice} onChange={onPriceChange} />
            <div>
              <span>ether</span>
            </div>
          </div>
          <button className={styles.sellButton} onClick={onClickSell}>
            판매하기
          </button>
        </div>
      )}
    </div>
  );
};

export default NFTCard;
