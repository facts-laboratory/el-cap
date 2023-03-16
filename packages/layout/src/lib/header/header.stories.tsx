import type { Meta } from '@storybook/react';
import { StandardHeader } from './header';

const Story: Meta<typeof StandardHeader> = {
  component: StandardHeader,
  title: 'StandardHeader',
};
export default Story;

export const Primary = {
  args: {},
};
