import Item from './Item.svelte'
import { render } from '@testing-library/svelte'

it('it works', async () => {
  const { getByText } = render(Item)

  expect(getByText('Hello component!'));
})
