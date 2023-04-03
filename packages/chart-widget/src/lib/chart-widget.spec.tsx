import { render } from '@testing-library/react';

import ChartWidget from './chart-widget';

describe('ChartWidget', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChartWidget />);
    expect(baseElement).toBeTruthy();
  });
});
