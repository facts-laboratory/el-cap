import { render } from '@testing-library/react';

import ContentContainer from './content-container';

describe('ContentContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContentContainer />);
    expect(baseElement).toBeTruthy();
  });
});
