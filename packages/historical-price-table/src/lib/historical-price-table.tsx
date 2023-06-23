import styles from './historical-price-table.module.css';

/* eslint-disable-next-line */
export interface HistoricalPriceTableProps {}

export function HistoricalPriceTable(props: HistoricalPriceTableProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to HistoricalPriceTable!</h1>
    </div>
  );
}

export default HistoricalPriceTable;
