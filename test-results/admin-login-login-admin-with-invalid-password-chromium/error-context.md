# Test info

- Name: login admin with invalid password
- Location: /home/salhi/Downloads/APIs_Products-master/e2e/admin/login.spec.js:31:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Invalid email or password"
Received: undefined
    at /home/salhi/Downloads/APIs_Products-master/e2e/admin/login.spec.js:42:26
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 |
   3 | test('login admin with specific email format', async ({ }) => {
   4 |     const context = await request.newContext();
   5 |     const response = await context.post('/admin/login', {
   6 |         data: {
   7 |             email: 'adminfayza@gmail.com',
   8 |             password: 'admin123dd'
   9 |         }
  10 |     });
  11 |     expect(response.status()).toBe(200);
  12 |     expect(response.statusText()).toEqual("OK");
  13 |     const body = await response.json();
  14 |     expect(body).toHaveProperty('token');
  15 | });
  16 |
  17 | test('login admin with invalid email format', async ({ }) => {
  18 |     const context = await request.newContext();
  19 |     const response = await context.post('/admin/login', {
  20 |         data: {
  21 |             email: 'adminfayza',
  22 |             password: 'admin123dd'
  23 |         }
  24 |     });
  25 |     expect(response.status()).toBe(400);
  26 |     expect(response.statusText()).toEqual("Bad Request");
  27 |     const body = await response.json();
  28 |     expect(body.error).toBe("Invalid email or password");
  29 | });
  30 |
  31 | test('login admin with invalid password', async ({ }) => {
  32 |     const context = await request.newContext();
  33 |     const response = await context.post('/admin/login', {
  34 |         data: {
  35 |             email: 'adminfayza@gmail.com',
  36 |             password: '12'
  37 |         }
  38 |     });
  39 |     expect(response.status()).toBe(400);
  40 |     expect(response.statusText()).toEqual("Bad Request");
  41 |     const body = await response.json();
> 42 |     expect(body.message).toBe('Invalid email or password');
     |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  43 | });
  44 |
  45 | test('login admin with empty data', async ({ }) => {
  46 |     const context = await request.newContext();
  47 |     const response = await context.post('/admin/login', {
  48 |         data: {
  49 |             email: '',
  50 |             password: ''
  51 |         }
  52 |     });
  53 |     expect(response.status()).toBe(400);
  54 |     expect(response.statusText()).toEqual("Bad Request");
  55 |     const body = await response.json();
  56 |     expect(body.error).toBe('Invalid email or password');
  57 | });
```