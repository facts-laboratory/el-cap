import type { Meta } from '@storybook/react';
import { Coin } from './coin';

const Story: Meta<typeof Coin> = {
  component: Coin,
  title: 'Coin',
};
export default Story;

export const Primary = {
  args: {},
};
