import React, { FC, useContext, useEffect, useState } from 'react';
import NFTCard from '../../components/MyNFTPage/NFTCard';
import styles from './MyNFTPage.module.css';
import { ISlimeMetaData } from '../../common/DataTypes';
import { SlimeCoreContract } from '../../contracts';
import { accountContext } from '../../App';

const MyNFTPage: FC = () => {
  const [slimeCards, setSlimeCards] = useState<ISlimeMetaData[]>([]);
  const { account } = useContext(accountContext);

  const getAnimalTokens = async () => {
    try {
      if (!account) return;

      // account가 가진 nft 수
      const balanceLength: string = await SlimeCoreContract.methods //
        .balanceOf(account)
        .call();

      if (balanceLength === '0') return;

      // 소유한 slime 정보 얻기
      const tempSlimeCards: ISlimeMetaData[] = [];

      const response = await SlimeCoreContract.methods
        .getSlimeTokensByAccount(account)
        .call();

      response.map((slime: ISlimeMetaData) => {
        tempSlimeCards.push({
          _id: slime._id,
          _genes: slime._genes,
          _type: slime._type,
          _fatherTokenId: slime._fatherTokenId,
          _motherTokenId: slime._motherTokenId,
          _health: slime._health,
          _attack: slime._attack,
          _price: slime._price,
        });
      });
      console.log(response);
      // setstate
      setSlimeCards(tempSlimeCards);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account) return;
    console.log(`Account: ${account} connected!`);

    getAnimalTokens();

    return () => {
      setSlimeCards([]);
    };
  }, [account]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>NFT를 판매하거나 판매취소할 수 있습니다.</span>
      </div>
      <div className={styles.cards}>
        {slimeCards.map((slimeCard) => (
          <div
            className={styles.card}
            key={slimeCard._id}
            data-id={slimeCard._id}
          >
            <NFTCard
              id={slimeCard._id}
              type={slimeCard._type}
              attack={slimeCard._attack}
              price={slimeCard._price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNFTPage;
