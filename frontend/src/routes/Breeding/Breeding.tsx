import React, { FC, useContext, useEffect, useState } from 'react';
import NFTCard from '../../components/Breeding/NFTCard';
import styles from './Breeding.module.css';
import { ISlimeMetaData, NFT } from '../../common/DataTypes';
import { SlimeCoreContract } from '../../contracts';
import { accountContext } from '../../App';

function isEmptyObj(obj: Object): boolean {
  if (obj === undefined) return true;
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

const Breeding: FC = () => {
  const { account } = useContext(accountContext);
  const [clicked, setClicked] = useState<Array<ISlimeMetaData>>([]); // 선택한 카드
  const [slimeCards, setSlimeCards] = useState<ISlimeMetaData[]>([]);

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

  const onClickCard = (e: React.MouseEvent<HTMLInputElement>) => {
    const id: string = e.currentTarget.getAttribute('data-id')!;
    const slimeCard: ISlimeMetaData = slimeCards.find(
      (slimeCard) => slimeCard._id === id
    )!;

    let newClicked: Array<ISlimeMetaData> = [...clicked];
    if (newClicked.length == 0) {
      newClicked.push(slimeCard);
    } else if (newClicked.length == 1 && newClicked[0]._id !== id) {
      newClicked.push(slimeCard);
    }
    setClicked(newClicked);
  };

  const isCardClicked = (slimeCard: ISlimeMetaData): boolean => {
    for (let i = 0; i < clicked.length; i++) {
      if (clicked[i]._id === slimeCard._id) return true;
    }
    return false;
  };

  const onClickBreedingCard = (e: React.MouseEvent<HTMLInputElement>) => {
    const id: string = e.currentTarget.getAttribute('data-id')!;
    let newClicked: Array<ISlimeMetaData> = clicked.filter(
      (slimeCard) => slimeCard._id !== id
    );

    setClicked(newClicked);
  };
  const onClickBreedingBtn = async () => {
    if (clicked.length < 2) {
      alert('슬라임 두 개를 선택해주세요.');
      return false;
    }
    const fatherTokenid = clicked[0]._id;
    const motherTokenid = clicked[1]._id;

    const response = await SlimeCoreContract.methods
      .breedslimes(fatherTokenid, motherTokenid)
      .send({ from: account });

    const newSlime = response.events.Birth.returnValues;
    const tempSlimeCards: ISlimeMetaData[] = [];

    tempSlimeCards.push({
      _id: newSlime.id,
      _genes: newSlime.genes,
      _type: newSlime.slimeType,
      _fatherTokenId: newSlime.fatherTokenId,
      _motherTokenId: newSlime.motherTokenId,
      _health: newSlime.health,
      _attack: newSlime.attack,
      _price: '0', // 브리딩 결과로 나온 slime은 가격이 0
    });
    // setstate
    setSlimeCards((prevSlimeCards) => [...prevSlimeCards, ...tempSlimeCards]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftHeader}>
          <span>카드 두개를 선택해서 브리딩을 수행해보세요</span>
        </div>
        <div className={styles.cards}>
          {slimeCards.map((slimeCard) => (
            <div
              className={
                isCardClicked(slimeCard)
                  ? `${styles.card} ${styles.clicked}`
                  : `${styles.card}`
              }
              key={slimeCard._id}
              data-id={slimeCard._id}
              onClick={onClickCard}
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
              data-id={clicked[0]._id}
            >
              <NFTCard
                id={clicked[0]._id}
                type={clicked[0]._type}
                attack={clicked[0]._attack}
                price={clicked[0]._price}
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
              data-id={clicked[1]._id}
            >
              <NFTCard
                id={clicked[1]._id}
                type={clicked[1]._type}
                attack={clicked[1]._attack}
                price={clicked[1]._price}
              />
            </div>
          )}
        </div>
        <div className={styles.breedingBtn}>
          <button
            className="btn btn-outline-secondary"
            onClick={onClickBreedingBtn}
          >
            브리딩 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Breeding;
