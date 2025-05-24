# Test info

- Name: Get Users with valid endpoint
- Location: /home/salhi/Downloads/APIs_Products-master/e2e/user/getUers.spec.js:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
    at /home/salhi/Downloads/APIs_Products-master/e2e/user/getUers.spec.js:5:29
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('Get Users with valid endpoint', async ({ request }) => {
   4 |   const response = await request.get('/users');
>  5 |   expect(response.status()).toBe(200);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
   6 |
   7 | });
   8 |
   9 | test('Get user with invalid endpoint', async ({ request }) => {
  10 |   const response = await request.get('/userss');
  11 |   expect(response.status()).toBe(404);
  12 |   expect(response.statusText()).toEqual("Not Found");
  13 | });
```