import type { Meta } from '@storybook/react';
import { ShowcaseWidget } from './showcase-widget';

const Story: Meta<typeof ShowcaseWidget> = {
  component: ShowcaseWidget,
  title: 'ShowcaseWidget',
};
export default Story;

export const Primary = {
  args: {},
};
