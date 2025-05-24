# Test info

- Name: Delete user with valid id
- Location: /home/salhi/Downloads/APIs_Products-master/e2e/user/deleteUser.spec.js:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
    at /home/salhi/Downloads/APIs_Products-master/e2e/user/deleteUser.spec.js:7:31
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 |
   3 | test('Delete user with valid id', async () => {
   4 |     const validId='68309ab99d0e23599a6db95b';
   5 |     const context = await request.newContext();
   6 |     const response = await context.delete(`/user/delete/${validId}`);
>  7 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
   8 |     expect(response.statusText()).toEqual("OK");
   9 |     const body = await response.json();
  10 |     expect(body.message).toContain('User deleted');
  11 | });
  12 |
  13 | test('Delete user not exist', async () => {
  14 |     const validId='68309960865fc2452e0a3a1c';
  15 |     const context = await request.newContext();
  16 |     const response = await context.delete(`/user/delete/${validId}`);
  17 |     expect(response.status()).toBe(400);
  18 |     expect(response.statusText()).toEqual("Bad Request");
  19 |     const body = await response.json();
  20 |     expect(body.error).toEqual('User not found');
  21 | });
  22 |
  23 | test('Delete user with invalid id', async () => {
  24 |     const validId='123456789';
  25 |     const context = await request.newContext();
  26 |     const response = await context.delete(`/user/delete/${validId}`);
  27 |     expect(response.status()).toBe(400);
  28 |     expect(response.statusText()).toEqual("Bad Request");
  29 |     const body = await response.json();
  30 |     expect(body.error).toContain('Invalid user ID');
  31 | });
  32 |
```