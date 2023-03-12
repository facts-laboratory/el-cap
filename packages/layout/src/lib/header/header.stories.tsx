import type { Meta } from '@storybook/react';
import { Header } from './header';

const Story: Meta<typeof Header> = {
  component: Header,
  title: 'Header',
};
export default Story;

export const Primary = {
  args: {},
};
