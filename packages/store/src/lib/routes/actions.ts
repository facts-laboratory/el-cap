import { NOT_FOUND } from 'redux-first-router';
// import { AssertionEntityWithAccountAndAssertion } from "./user/user.slice";

export interface GoToPageProps {
  txId?: string;
  userAddress?: string;
  entity: any; // AssertionEntityWithAccountAndAssertion;
}

export const goToPage = (type: string, props?: GoToPageProps) => ({
  type,
  payload: props && { ...props },
});

export const goToFeed = () => ({
  type: 'FEED',
});

export const goToCoin = (coin: string) => ({
  type: 'COIN',
  payload: { coin },
});

export const notFound = () => ({
  type: NOT_FOUND,
});

export interface LocationProps {
  location: any;
}

export const mapStateToProps = (state: any, props: any) => {
  return {
    ...props,
    page: state.page,
    tx: state?.location?.payload?.tx,
    ticker: state?.location?.payload?.ticker,
    entity: state?.location?.payload?.entity,
  };
};
