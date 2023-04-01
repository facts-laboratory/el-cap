import type { Meta } from '@storybook/react';
import { TradingView } from './trading-view';

const Story: Meta<typeof TradingView> = {
  component: TradingView,
  title: 'TradingView',
};
export default Story;

export const Primary = {
  args: {},
};
