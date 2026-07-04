import { test, expect, request } from '@playwright/test';
import Ajv from 'ajv';

const endpoint = 'https://fakestoreapi.com/products/1';

const productSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    price: { type: 'number' },
    category: { type: 'string' },
    description: { type: 'string' },
  },
  required: ['id', 'title', 'price', 'category', 'description'],
  additionalProperties: true,
};

test('GET /products/1 returns valid product object', async ({ request: apiRequest }) => {
  const response = await apiRequest.get(endpoint);

  expect(response.status()).toBe(200);

  const product = await response.json();

  expect(product).toHaveProperty('id');
  expect(product).toHaveProperty('title');
  expect(product).toHaveProperty('price');
  expect(product).toHaveProperty('category');
  expect(product).toHaveProperty('description');

  const ajv = new Ajv();
  const validate = ajv.compile(productSchema);
  const valid = validate(product);
  expect(valid, validate?.errors?.map(error => `${error.instancePath} ${error.message}`).join(', ')).toBe(true);

  console.log(`Product title: ${product.title}`);
  console.log(`Product price: ${product.price}`);
});
