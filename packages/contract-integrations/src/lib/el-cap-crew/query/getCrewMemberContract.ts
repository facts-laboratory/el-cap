export async function getCrewMemberContract(address: string) {
  const query = `
  {
    transactions(first: 30, tags: [{name: "El-Cap-Version", values: ["TST-3"]}], owners:["${address}"]) {
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
