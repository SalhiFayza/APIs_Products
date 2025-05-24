# Test info

- Name: Admin get a product by id >> Get product by invalid id
- Location: /home/salhi/Downloads/APIs_Products-master/e2e/products/getProdById.spec.js:34:9

# Error details

```
Error: expect(received).toMatchObject(expected)

Matcher error: received value must be a non-null object

Received has type:  string
Received has value: "Product not found"
    at /home/salhi/Downloads/APIs_Products-master/e2e/products/getProdById.spec.js:43:30
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 |
   4 | test.describe('Admin get a product by id', () => {
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
  20 |     test('Get product by id', async({request }) => {
  21 |         const prodId = '68320b73d1c90ef9ba8266df';
  22 |         const response = await request.get(`/product/${prodId}`,{
  23 |             headers: {
  24 |                 Authorization: `Bearer ${token}`,
  25 |             }
  26 |         });
  27 |         expect(response.status()).toBe(200);
  28 |         expect(response.statusText()).toBe("OK");
  29 |         const body = await response.json();
  30 |         expect(body._id).toBe(prodId);
  31 |     });
  32 |
  33 |
  34 |     test('Get product by invalid id', async({request }) => {
  35 |         const prodId = '682f24af6c3d252564cc4218';
  36 |         const response = await request.get(`/product/${prodId}`,{ headers: {
  37 |             Authorization: `Bearer ${token}`,
  38 |         }
  39 |     });
  40 |         expect(response.status()).toBe(404);
  41 |         expect(response.statusText()).toBe("Not Found");
  42 |         const body = await response.json();
> 43 |         expect(body.message).toMatchObject("Product not found");
     |                              ^ Error: expect(received).toMatchObject(expected)
  44 |     });
  45 |
  46 | });
```