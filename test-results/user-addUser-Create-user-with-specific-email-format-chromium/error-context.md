# Test info

- Name: Create user with specific email format
- Location: /home/salhi/Downloads/APIs_Products-master/e2e/user/addUser.spec.js:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
    at /home/salhi/Downloads/APIs_Products-master/e2e/user/addUser.spec.js:14:29
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 |
   3 | test('Create user with specific email format', async ({}) => {
   4 |   const context = await request.newContext();
   5 |
   6 |   const response = await context.post('/register', {
   7 |     data: {
   8 |       userName: 'Salhi Fayza',
   9 |       email: generateCustomEmail(),
  10 |       password: '123456789'
  11 |     }
  12 |   });
  13 |
> 14 |   expect(response.status()).toBe(200);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  15 |   expect(response.statusText()).toEqual("OK");
  16 |   const body = await response.json();
  17 |   expect(body.message).toBe('User registered successfully');
  18 |
  19 | });
  20 |
  21 | test('Create user inwith email format', async ({}) => {
  22 |     const context = await request.newContext();
  23 |
  24 |     const response = await context.post('/register', {
  25 |       data: {
  26 |         userName: 'Salhi Fayza',
  27 |         email: 'fayza',
  28 |         password: '123456789'
  29 |       }
  30 |     });
  31 |
  32 |     expect(response.status()).toBe(400);
  33 |     expect(response.statusText()).toEqual("Bad Request");
  34 |
  35 |     const body = await response.json();
  36 |     expect(body.error).toContain('"email" must be a valid email');
  37 |
  38 |   });
  39 |   test('should return error when userName is empty', async ({ request }) => {
  40 |     const response = await request.post('/register', {
  41 |       data: {
  42 |         userName: '',
  43 |         email: 'fayza@gamil.com',
  44 |         password: 'password2025'
  45 |       }
  46 |     });
  47 |
  48 |     expect(response.status()).toBe(400);
  49 |     const body = await response.json();
  50 |     expect(body.error).toContain('"userName" is not allowed to be empty');
  51 |
  52 |   });
  53 |
  54 |   test('should return error when email is empty', async ({ request }) => {
  55 |     const response = await request.post('/register', {
  56 |       data: {
  57 |         userName: 'Fayza Salhi',
  58 |         email: '',
  59 |         password: 'password2025'
  60 |       }
  61 |     });
  62 |
  63 |     expect(response.status()).toBe(400);
  64 |     const body = await response.json();
  65 |     expect(body.error).toContain('"email" is not allowed to be empty');
  66 |
  67 |   });
  68 |
  69 |   test('should return error when password is empty', async ({ request }) => {
  70 |     const response = await request.post('/register', {
  71 |       data: {
  72 |         userName: 'Fayza Salhi',
  73 |         email: 'fayzatest@gmail.com',
  74 |         password: ''
  75 |       }
  76 |     });
  77 |
  78 |     expect(response.status()).toBe(400);
  79 |     const body = await response.json();
  80 |     expect(body.error).toContain('"password" is not allowed to be empty');
  81 |
  82 |   });
  83 | //-------------------------------- 🥇
  84 | function generateCustomEmail() {
  85 |     const digits = Math.floor(Math.random() * 90 + 10); // Two digits (10–99)
  86 |     const letters = String.fromCharCode(
  87 |       97 + Math.floor(Math.random() * 26),
  88 |       97 + Math.floor(Math.random() * 26)
  89 |     );
  90 |   // Generate email like fayza21ab@gmail.com
  91 |     return `fayza${digits}${letters}@gmail.com`;
  92 |   }
```