import { render } from '@testing-library/react';

import WidgetCoinCard from './widget-coin-card';

describe('WidgetCoinCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WidgetCoinCard />);
    expect(baseElement).toBeTruthy();
  });
});
