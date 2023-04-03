import { render } from '@testing-library/react';

import ShowcaseWidget from './showcase-widget';

describe('ShowcaseWidget', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShowcaseWidget />);
    expect(baseElement).toBeTruthy();
  });
});
