import type { Meta } from '@storybook/react';
import { Interfaces } from './interfaces';

const Story: Meta<typeof Interfaces> = {
  component: Interfaces,
  title: 'Interfaces',
};
export default Story;

export const Primary = {
  args: {},
};
