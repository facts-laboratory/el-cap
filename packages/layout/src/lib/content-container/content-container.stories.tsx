import type { Meta } from '@storybook/react';
import { StandardContentContainer } from './content-container';

const Story: Meta<typeof StandardContentContainer> = {
  component: StandardContentContainer,
  title: 'StandardContentContainer',
};
export default Story;

export const Primary = {
  args: {},
};
