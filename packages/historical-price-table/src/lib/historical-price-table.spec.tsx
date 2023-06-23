import { render } from '@testing-library/react';

import HistoricalPriceTable from './historical-price-table';

describe('HistoricalPriceTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HistoricalPriceTable />);
    expect(baseElement).toBeTruthy();
  });
});
