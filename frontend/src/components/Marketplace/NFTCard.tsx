import React, { FC, useContext, useEffect, useState } from 'react';
import styles from './NFTCard.module.css';
import { NFTCardProps } from '../../common/DataTypes';
import { SlimeBaseContract, SlimeSaleContract, web3 } from '../../contracts';
import { accountContext } from '../../App';

interface MarketplaceNFTCardProps extends NFTCardProps {
  setSlimeCardsOnSale: Function;
}

const NFTCard: FC<MarketplaceNFTCardProps> = ({
  id,
  type,
  health,
  attack,
  price,
  setSlimeCardsOnSale,
}) => {
  const { account } = useContext(accountContext);
  const [isBuyable, setIsBuyable] = useState<boolean>(false);

  const getSlimeTokenOwner = async () => {
    try {
      const response = await SlimeBaseContract.methods.ownerOf(id).call();

      // nft판매자와 계정이 달라야 구매가능
      setIsBuyable(
        account.toLocaleLowerCase() !== response.toLocaleLowerCase()
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onClickBuy = async () => {
    try {
      if (!account) return;

      const response = await SlimeSaleContract.methods //
        .purchaseSlimeToken(id)
        .send({ from: account, value: price });

      if (response.status) {
        await setSlimeCardsOnSale();
        await getSlimeTokenOwner();
      }
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
        <span>체력: {health}</span>
        <span>공격력: {attack}</span>
      </div>
      {isBuyable && (
        <button className="btn btn-outline-secondary" onClick={onClickBuy}>
          Buy
        </button>
      )}
    </div>
  );
};

export default NFTCard;
