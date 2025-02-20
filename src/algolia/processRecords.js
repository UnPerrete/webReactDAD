import { algoliasearch } from 'algoliasearch';

const client = algoliasearch('9L1XI9XXET', 'b703521a14d791dd903920f9f1c08dfb');

// Fetch and index objects in Algolia
const processRecords = async () => {
  const datasetRequest = await fetch('https://fakestoreapi.com/products');
  const products = await datasetRequest.json();
  return await client.saveObjects({ indexName: 'id', objects: products });
};

processRecords()
  .then(() => console.log('Successfully indexed objects!'))
  .catch((err) => console.error(err));