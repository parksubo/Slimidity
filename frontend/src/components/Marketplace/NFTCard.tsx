import React, { FC, useContext, useEffect, useState } from 'react';
import styles from './NFTCard.module.css';
import { NFTCardProps } from '../../common/DataTypes';
import { SlimeCoreContract, web3 } from '../../contracts';
import { accountContext } from '../../App';

const NFTCard: FC<NFTCardProps> = ({ id, type, attack, price }) => {
  const { account } = useContext(accountContext);
  const [isBuyable, setIsBuyable] = useState<boolean>(false);

  const getSlimeTokenOwner = async () => {
    try {
      const response = await SlimeCoreContract.methods.ownerOf(id).call();

      // nft판매자와 계정이 달라야 구매가능
      setIsBuyable(
        account.toLocaleLowerCase() !== response.toLocaleLowerCase()
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSlimeTokenOwner();
  }, []);
  return (
    <div className={styles.container}>
      <span>id: {id}</span>
      <img src={require('../../images/IceSlime.png')} className={styles.img} />
      <div className={styles.metadata}>
        <span>가격: {web3.utils.fromWei(price)} ether</span>
        <span>타입: {type}</span>
        <span>공격력: {attack}</span>
      </div>
      {isBuyable && <button className="btn btn-outline-secondary">Buy</button>}
    </div>
  );
};

export default NFTCard;
