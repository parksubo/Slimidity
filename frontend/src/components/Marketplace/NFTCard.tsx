import React, { FC } from 'react';
import styles from './NFTCard.module.css';
const NFTCard: FC = (props) => {
  return (
    <div className={styles.container}>
      <img src={require('../../images/IceSlime.png')} className={styles.img} />
      <span>10ether</span>
      <button className="btn btn-outline-secondary">Buy</button>
    </div>
  );
};

export default NFTCard;
