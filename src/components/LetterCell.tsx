import styles from './LetterCell.module.css';

interface Props {
  value: string;
  disabled: boolean;
}

function LetterCell({ value, disabled }: Props) {
  const classNameList = [styles.cell];

  if (disabled) {
    classNameList.push(styles.disabledCell);
  }

  return <div className={classNameList.join(' ')}>{value}</div>;
}

export default LetterCell;
