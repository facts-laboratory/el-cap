import styles from './widget-coin-card.module.css';

/* eslint-disable-next-line */
export interface WidgetCoinCardProps {}

export function WidgetCoinCard(props: WidgetCoinCardProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WidgetCoinCard!</h1>
    </div>
  );
}

export default WidgetCoinCard;
