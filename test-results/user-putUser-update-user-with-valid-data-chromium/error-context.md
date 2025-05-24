# Test info

- Name: update user with valid data
- Location: /home/salhi/Downloads/APIs_Products-master/e2e/user/putUser.spec.js:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
    at /home/salhi/Downloads/APIs_Products-master/e2e/user/putUser.spec.js:13:40
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 |
   3 | test('update user with valid data', async () => {
   4 |     const validId='68321f20885a10c597494033';
   5 |     const context = await request.newContext();
   6 |     const response = await context.patch(`/user/edit/${validId}`, {
   7 |         data: {
   8 |             image:"https://letsenhance.io/MainBefore.jpg",
   9 |             userName: "Salhi Update",
   10 |             email: "fayzaupdate@gmail.com",
   11 |             password: "password209"
   12 |         }
>  13 |       });    expect(response.status()).toBe(200);
      |                                        ^ Error: expect(received).toBe(expected) // Object.is equality
   14 |     expect(response.statusText()).toEqual("OK");
   15 |     const body = await response.json();
   16 |     expect(body.message).toContain('User updated');
   17 | });
   18 |
   19 | test('update user with invalid email', async () => {
   20 |     const validId='6830cbbe8a7f4c1c3a8df67c';
   21 |     const context = await request.newContext();
   22 |     const response = await context.patch(`/user/edit/${validId}`, {
   23 |         data: {
   24 |             image:"https://letsenhance.io/MainBefore.jpg",
   25 |             userName: "Salhi Update",
   26 |             email: "fayzaupdate",
   27 |             password: "password209"
   28 |         }
   29 |       });    expect(response.status()).toBe(400);
   30 |     expect(response.statusText()).toEqual("Bad Request");
   31 |     const body = await response.json();
   32 |     expect(body.error).toContain('"email" must be a valid email');
   33 | });
   34 |
   35 | test('update user with invalid password', async () => {
   36 |     const validId='6830cbbe8a7f4c1c3a8df67c';
   37 |     const context = await request.newContext();
   38 |     const response = await context.patch(`/user/edit/${validId}`, {
   39 |         data: {
   40 |             image:"https://letsenhance.io/MainBefore.jpg",
   41 |             userName: "Salhi Update",
   42 |             email: "fayzaupdate@gmail.com",
   43 |             password: "pas"
   44 |         }
   45 |       });    expect(response.status()).toBe(400);
   46 |     expect(response.statusText()).toEqual("Bad Request");
   47 |     const body = await response.json();
   48 |     expect(body.error).toContain('"password" length must be at least 6 characters long');
   49 | }); 
   50 |
   51 | test('update user with empty image', async () => {
   52 |     const validId='6830cbbe8a7f4c1c3a8df67c';
   53 |     const context = await request.newContext();
   54 |     const response = await context.patch(`/user/edit/${validId}`, {
   55 |         data: {
   56 |             image:"",
   57 |             userName: "Salhi Update",
   58 |             email: "fayzaupdate@gmail.com",
   59 |             password: "passsword2025"
   60 |         }
   61 |       });    expect(response.status()).toBe(400);
   62 |     expect(response.statusText()).toEqual("Bad Request");
   63 |     const body = await response.json();
   64 |     expect(body.error).toContain('"image" is not allowed to be empty');
   65 | });
   66 | test('update user with empty email', async () => {
   67 |     const validId='6830cbbe8a7f4c1c3a8df67c';
   68 |     const context = await request.newContext();
   69 |     const response = await context.patch(`/user/edit/${validId}`, {
   70 |         data: {
   71 |             image:"https://letsenhance.io/MainBefore.jpg",
   72 |             userName: "Salhi Update",
   73 |             email: "",
   74 |             password: "password2025"
   75 |         }
   76 |       });    expect(response.status()).toBe(400);
   77 |     expect(response.statusText()).toEqual("Bad Request");
   78 |     const body = await response.json();
   79 |     expect(body.error).toContain('"email" is not allowed to be empty');
   80 | });
   81 |
   82 | test('update user with empty passowrd', async () => {
   83 |     const validId='6830cbbe8a7f4c1c3a8df67c';
   84 |     const context = await request.newContext();
   85 |     const response = await context.patch(`/user/edit/${validId}`, {
   86 |         data: {
   87 |             image:"https://letsenhance.io/MainBefore.jpg",
   88 |             userName: "Salhi Update",
   89 |             email: "fayzatest@gmail.com",
   90 |             password: ""
   91 |         }
   92 |       });    expect(response.status()).toBe(400);
   93 |     expect(response.statusText()).toEqual("Bad Request");
   94 |     const body = await response.json();
   95 |     expect(body.error).toContain('"password" is not allowed to be empty');
   96 | });
   97 |
   98 | test('update user with empty userName', async () => {
   99 |     const validId='6830cbbe8a7f4c1c3a8df67c';
  100 |     const context = await request.newContext();
  101 |     const response = await context.patch(`/user/edit/${validId}`, {
  102 |         data: {
  103 |             image:"https://letsenhance.io/MainBefore.jpg",
  104 |             userName: "",
  105 |             email: "fayzatest@gmail.com",
  106 |             password: "password2025"
  107 |         }
  108 |       });    expect(response.status()).toBe(400);
  109 |     expect(response.statusText()).toEqual("Bad Request");
  110 |     const body = await response.json();
  111 |     expect(body.error).toContain('"userName" is not allowed to be empty');
  112 | });
```