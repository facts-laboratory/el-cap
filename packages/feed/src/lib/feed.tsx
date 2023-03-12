import styles from './feed.module.css';

/* eslint-disable-next-line */
export interface FeedProps {}

export function Feed(props: FeedProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Feed!</h1>
    </div>
  );
}

export default Feed;
