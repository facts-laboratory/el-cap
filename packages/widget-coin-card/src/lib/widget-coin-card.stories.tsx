import type { Meta } from '@storybook/react';
import { WidgetCoinCard } from './widget-coin-card';

const Story: Meta<typeof WidgetCoinCard> = {
  component: WidgetCoinCard,
  title: 'WidgetCoinCard',
};
export default Story;

export const Primary = {
  args: {},
};
