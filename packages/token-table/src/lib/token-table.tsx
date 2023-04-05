import styles from './token-table.module.css';

/* eslint-disable-next-line */
export interface TokenTableProps {}

export function TokenTable(props: TokenTableProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TokenTable!</h1>
    </div>
  );
}

export default TokenTable;
