import { render } from '@testing-library/react';

import TokenTable from './token-table';

describe('TokenTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TokenTable />);
    expect(baseElement).toBeTruthy();
  });
});
