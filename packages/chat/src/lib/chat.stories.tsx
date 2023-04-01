import type { Meta } from '@storybook/react';
import { Chat } from './chat';

const Story: Meta<typeof Chat> = {
  component: Chat,
  title: 'Chat',
};
export default Story;

export const Primary = {
  args: {},
};
