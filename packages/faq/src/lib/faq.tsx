import { connect } from 'react-redux';
import styles from './faq.module.css';
import { mapStateToProps } from '@el-cap/store';
/* eslint-disable-next-line */
export interface FaqProps {}

export function Faq(props: FaqProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Faq!</h1>
    </div>
  );
}

export default Faq;

export const ConnectedFaq = connect(mapStateToProps, (dispatch) => ({
  goToCoin: (ticker: string, entity: any) =>
    dispatch({ type: 'COIN', payload: { ticker, entity } }),
  goToFeed: (key: string) => dispatch({ type: 'FEED', payload: { key } }),
}))(Faq);
