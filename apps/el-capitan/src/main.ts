import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'el-capitan',
  },
});

export default app;
