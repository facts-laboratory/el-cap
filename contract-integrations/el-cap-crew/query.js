import { getEdges, getNode } from '@facts-kit/contract-kit';

export async function getCrewMemberContract() {
  console.log('==getCrewMemberContract== Initiated');

  const query = `
      {
        transactions(first: 30, tags: [{name: "El-Cap-Version", values: ["MVP-7"]}], owners:["BcSorVqCuAW4vvHeia1C-xcNzd4YNiEUcoIcBrAgZQo"]) {
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
  console.log('==getCrewMemberContract== Query:', query);

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

  console.log('==getCrewMemberContract== Response received:', res);

  const response = await res.json();
  console.log('==getCrewMemberContract== JSON response:', response);

  const edges = response.data.transactions.edges;
  console.log('==getCrewMemberContract== Edges:', edges);

  return edges;
}
