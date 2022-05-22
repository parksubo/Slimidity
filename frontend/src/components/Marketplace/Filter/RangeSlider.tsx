import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styles from './RangeSlider.module.css';

function valuetext(value: number) {
  return `${value}°C`;
}

interface RangeSliderProps {
  attackValue: number[];
  setAttackValue: Function;
  handleAttackValueChangeSlider: (
    event: Event,
    newValue: number | number[]
  ) => void;
  handleAttackValueChangeInput: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  attackValue,
  setAttackValue,
  handleAttackValueChangeSlider,
  handleAttackValueChangeInput,
}) => {
  return (
    <>
      <Slider
        getAriaLabel={() => 'Attack'}
        value={attackValue}
        onChange={handleAttackValueChangeSlider}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={20}
      />
      <div className={styles.InputbtnContainer}>
        <input
          className={styles.InputBtn}
          type="number"
          data-min
          value={attackValue[0]}
          onChange={handleAttackValueChangeInput}
        ></input>
        <span>-</span>
        <input
          className={styles.InputBtn}
          type="number"
          data-max
          value={attackValue[1]}
          onChange={handleAttackValueChangeInput}
        ></input>
      </div>
    </>
  );
};

export default RangeSlider;
