import React, { useState, ChangeEvent, FC } from 'react';
import { motion } from 'framer-motion';

import styles from './Input.module.scss';

interface InputProps {
  type: 'text' | 'email' | 'password';
  label: string;
  value: string | null;
  onChange: (value: string) => void;
}

const variants = {
  small: { top: 0, fontSize: '14px', transition: { type: 'spring' } },
  big: { top: 35, fontSize: '18px', transition: { type: 'spring' } },
};

const Input: FC<InputProps> = ({ type, label, value, onChange }) => {
  const [focus, setFocus] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const labelClasses = [styles.label];

  if (value || focus) labelClasses.push(styles.activeLabel);

  return (
    <div className={styles.wrapper}>
      <input
        type={type}
        className={styles.input}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(event) => handleChange(event)}
      />
      <motion.p
        initial="big"
        animate={value || focus ? 'small' : 'big'}
        variants={variants}
        className={labelClasses.join(' ')}
      >
        {label}
      </motion.p>
    </div>
  );
};

export default Input;
