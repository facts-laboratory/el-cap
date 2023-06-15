import { render } from '@testing-library/react';

import TopCoinsCard from './top-coins-card';

describe('TopCoinsCard', () => {
  it('should render successfully', () => {
    const TrendingdummyData = [
      {
        name: 'Bitcoin',
        symbol: 'BTC',
        metric: -4.28,
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
      },
      {
        name: 'Ethereum',
        symbol: 'ETH',
        metric: 4000,
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
      },
      {
        name: 'Cardano',
        symbol: 'ADA',
        metric: 2.12,
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
      },
      {
        name: 'Dogecoin',
        symbol: 'DOGE',
        metric: 0.24,
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
      },
    ];
    const { baseElement } = render(<TopCoinsCard
              title="Trending Coins"
              type="Trending"
              data={TrendingdummyData}
              goToCoin={() => {
                console.log('gotocoin')
              }}
              goToFeed={() => {
                console.log('goto feed')
              }} />);
    expect(baseElement).toBeTruthy();
  });
});
