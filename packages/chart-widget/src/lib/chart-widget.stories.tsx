import type { Meta } from '@storybook/react';
import { ChartWidget } from './chart-widget';

const Story: Meta<typeof ChartWidget> = {
  component: ChartWidget,
  title: 'ChartWidget',
};
export default Story;

export const Primary = {
  args: {},
};
