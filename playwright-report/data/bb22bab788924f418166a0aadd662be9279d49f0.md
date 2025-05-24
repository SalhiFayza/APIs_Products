# Test info

- Name: Get user by invalid id
- Location: /home/salhi/Downloads/APIs_Products-master/e2e/user/getUserById.spec.js:12:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 400
    at /home/salhi/Downloads/APIs_Products-master/e2e/user/getUserById.spec.js:15:31
```

# Test source

```ts
   1 | import {test, expect} from '@playwright/test';
   2 |
   3 | test('Get user by valid id', async({request})=>{
   4 | const validId = '68309a7110a82a5bca28b4c1';
   5 | const response = await request.get(`/user/${validId}`);
   6 | expect(response.status()).toBe(200);
   7 | expect(body._id).toBe(validId);
   8 |
   9 |
  10 | })
  11 |
  12 | test('Get user by invalid id', async({request})=>{
  13 |     const invalidId = '682f24af6c3d252564cc4218';
  14 |     const response = await request.get(`/user/${invalidId}`);
> 15 |     expect(response.status()).toBe(404);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  16 |     expect(response.statusText()).toEqual("Not Found");
  17 |     const body = await response.json();
  18 |   expect(body).toMatchObject({
  19 |     "message": "User not found"
  20 |   });
  21 |     })
```