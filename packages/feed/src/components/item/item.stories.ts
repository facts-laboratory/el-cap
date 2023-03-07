// import { action } from '@storybook/addon-actions';
import Item from './Item.svelte';

export default {
  title: 'Item',
  component: Item,
};

export const Text = () => ({
  Component: Item,
  props: {},
});
