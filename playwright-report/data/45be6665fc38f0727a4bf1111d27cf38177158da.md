# Test info

- Name: Admin updates a product >> Update product by invalid id
- Location: /home/salhi/Downloads/APIs_Products-master/e2e/products/updateProd.spec.js:21:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 400
    at /home/salhi/Downloads/APIs_Products-master/e2e/products/updateProd.spec.js:40:31
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |
   3 | test.describe('Admin updates a product', () => {
   4 |   let token;
   5 |
   6 |   test.beforeAll(async ({ request }) => {
   7 |     const loginResponse = await request.post('/admin/login', {
   8 |       data: {
   9 |         email: 'adminfayza@gmail.com',
  10 |         password: 'admin123dd',
  11 |       },
  12 |     });
  13 |     expect(loginResponse.ok()).toBeTruthy();
  14 |
  15 |     const loginBody = await loginResponse.json();
  16 |     token = loginBody.token;
  17 |     console.log('Token:', token); // Debug token
  18 |     expect(token).toBeTruthy();
  19 |   });
  20 |
  21 |   test('Update product by invalid id', async ({ request }) => {
  22 |     const invalidProductId = '000000000000000000000000'; // valid ObjectId format but non-existent
  23 |     const response = await request.put(`/product/edit/${invalidProductId}`, {
  24 |       headers: {
  25 |         Authorization: `Bearer ${token}`,
  26 |         'Content-Type': 'application/json',
  27 |       },
  28 |       data: {
  29 |         image: "https://example.com/image.jpg",
  30 |         nameProduct: "New Product",
  31 |         description: "This is a great product",
  32 |         priceProduct: 9.02,
  33 |       },
  34 |     });
  35 |
  36 |     if (response.status() !== 404) {
  37 |       console.log('Response body for invalid ID:', await response.json());
  38 |     }
  39 |
> 40 |     expect(response.status()).toBe(404);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  41 |     const body = await response.json();
  42 |     expect(body).toEqual({ message: "Product not found or no changes made" });
  43 |   });
  44 |
  45 |   test('Update product without Token', async ({ request }) => {
  46 |     const productId = '68320b73d1c90ef9ba8266df'; // existing product ID
  47 |     const response = await request.put(`/product/edit/${productId}`, {
  48 |       data: {
  49 |         image: "https://example.com/image.jpg",
  50 |         nameProduct: "New Product",
  51 |         description: "This is a great product",
  52 |         priceProduct: 450,
  53 |       },
  54 |     });
  55 |
  56 |     if (response.status() !== 401) {
  57 |       console.log('Response body without token:', await response.json());
  58 |     }
  59 |
  60 |     expect(response.status()).toBe(401);
  61 |     const body = await response.json();
  62 |     expect(body).toEqual({ message: "Access denied. No token provided." });
  63 |   });
  64 |
  65 |   test('Update product by valid id', async ({ request }) => {
  66 |     const productId = '68320b73d1c90ef9ba8266df'; // existing product ID
  67 |     const response = await request.put(`/product/edit/${productId}`, {
  68 |       headers: {
  69 |         Authorization: `Bearer ${token}`,
  70 |         'Content-Type': 'application/json',
  71 |       },
  72 |       data: {
  73 |         image: "https://example.com/image.jpg",
  74 |         nameProduct: "New Product 200",
  75 |         description: "This is a product 200",
  76 |         priceProduct: 42,
  77 |       },
  78 |     });
  79 |
  80 |     if (response.status() !== 200) {
  81 |       console.log('Response body for valid update:', await response.json());
  82 |     }
  83 |
  84 |     expect(response.status()).toBe(200);
  85 |     const body = await response.json();
  86 |     expect(body).toEqual({ message: "Product updated successfully" });
  87 |   });
  88 | });
  89 |
```