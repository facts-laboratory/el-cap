import type { Meta } from '@storybook/react';
import { Feed } from './feed';

const Story: Meta<typeof Feed> = {
  component: Feed,
  title: 'Feed',
};
export default Story;

export const Primary = {
  args: {},
};
