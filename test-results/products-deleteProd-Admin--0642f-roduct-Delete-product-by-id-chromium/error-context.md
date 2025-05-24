# Test info

- Name: Admin delete a product >> Delete product by id
- Location: /home/salhi/Downloads/APIs_Products-master/e2e/products/deleteProd.spec.js:20:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
    at /home/salhi/Downloads/APIs_Products-master/e2e/products/deleteProd.spec.js:28:35
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 |
   4 | test.describe('Admin delete a product', () => {
   5 |     let token;
   6 |
   7 |     test.beforeAll(async ({ request }) => {
   8 |         const loginResponse = await request.post('/admin/login', {
   9 |             data: {
  10 |                 email: 'adminfayza@gmail.com',
  11 |                 password: 'admin123dd',
  12 |             },
  13 |         });
  14 |         expect(loginResponse.ok()).toBeTruthy();
  15 |         const loginBody = await loginResponse.json();
  16 |         token = loginBody.token;
  17 |         expect(token).toBeTruthy();
  18 |     });
  19 |
  20 |     test('Delete product by id', async ({ request }) => {
  21 |         const productId = '683228c17e083b0cfd3ecae9';
  22 |         const response = await request.delete(`/product/delete/${productId}`, {
  23 |             headers: {
  24 |                 Authorization: `Bearer ${token}`,
  25 |             },
  26 |         });
  27 |
> 28 |         expect(response.status()).toBe(200);
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  29 |         expect(response.statusText()).toBe("OK");
  30 |         const body = await response.json();
  31 |         expect(body).toEqual({ message: "Product deleted successfully" });
  32 |     });
  33 |     test('Delete product by invalid id', async ({ request }) => {
  34 |         const productId = '000000000000000000000000';
  35 |         const response = await request.delete(`/product/delete/${productId}`, {
  36 |             headers: {
  37 |                 Authorization: `Bearer ${token}`,
  38 |                 'Content-Type': 'application/json'
  39 |             },
  40 |         });
  41 |
  42 |         expect(response.status()).toBe(404);
  43 |         expect(response.statusText()).toBe("Not Found");
  44 |         const body = await response.json();
  45 |         expect(body).toEqual({ message: "Product not found" });
  46 |     });
  47 |
  48 |
  49 |     test('Delete product without token', async ({ request }) => {
  50 |         const productId = '68321c5d6db301eee1ca271e';
  51 |         const response = await request.delete(`/product/delete/${productId}`);
  52 |
  53 |         expect(response.status()).toBe(401);
  54 |         expect(response.statusText()).toBe("Unauthorized");
  55 |         const body = await response.json();
  56 |         expect(body).toEqual({ message: "Access denied. No token provided." });
  57 |     });
  58 | });
```