import type { Meta } from '@storybook/react';
import { HistoricalPriceTable } from './historical-price-table';

const Story: Meta<typeof HistoricalPriceTable> = {
  component: HistoricalPriceTable,
  title: 'HistoricalPriceTable',
};
export default Story;

export const Primary = {
  args: {},
};
