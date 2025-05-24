import { test, expect } from '@playwright/test';

test('Get Users with valid endpoint', async ({ request }) => {
  const response = await request.get('/users');
  expect(response.status()).toBe(200);

});

test('Get user with invalid endpoint', async ({ request }) => {
  const response = await request.get('/userss');
  expect(response.status()).toBe(404);
  expect(response.statusText()).toEqual("Not Found");
});