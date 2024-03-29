import { EL_CAP_RIGGING_TX } from '../constants';

export async function getLatestHydrate() {
  const query = `
    {
      transactions(first: 30, tags: [{name: "Contract", values: "${EL_CAP_RIGGING_TX}"}]) {
        edges {
          node {
            id
            owner {
              address
            }
            block {
              timestamp
              height
            }
            tags {
              name
              value
            }
          }
        }
      }
    }
        `;

  const res = await fetch('https://arweave.net/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  });

  const response = await res.json();

  const edges = response.data.transactions.edges;

  return edges;
}
