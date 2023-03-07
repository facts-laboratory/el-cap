import Info from './Info.svelte'
import { render } from '@testing-library/svelte'

it('it works', async () => {
  const { getByText } = render(Info)

  expect(getByText('Hello component!'));
})
