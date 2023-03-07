<script lang="ts">
  export let name: string;
  let prices: any;
  import redstone from 'redstone-api';
  redstone
    .getAllPrices()
    .then((p) => (prices = p))
    .catch(console.log);
</script>

<main>
  <h1>{name}</h1>
  <h3>Prices</h3>
  <p>{JSON.stringify(prices)}</p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
