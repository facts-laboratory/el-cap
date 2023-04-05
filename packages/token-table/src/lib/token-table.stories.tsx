import type { Meta } from '@storybook/react';
import { TokenTable } from './token-table';

const Story: Meta<typeof TokenTable> = {
  component: TokenTable,
  title: 'TokenTable',
};
export default Story;

export const Primary = {
  args: {},
};
