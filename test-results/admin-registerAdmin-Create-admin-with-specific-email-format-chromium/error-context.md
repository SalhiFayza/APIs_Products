# Test info

- Name: Create admin with specific email format
- Location: /home/salhi/Downloads/APIs_Products-master/e2e/admin/registerAdmin.spec.js:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
    at /home/salhi/Downloads/APIs_Products-master/e2e/admin/registerAdmin.spec.js:14:31
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 |
   3 | test('Create admin with specific email format', async ({ }) => {
   4 |     const context = await request.newContext();
   5 |
   6 |     const response = await context.post('/admin/register', {
   7 |         data: {
   8 |             userName: 'Salhi Fayza',
   9 |             email: generateCustomEmail(),
   10 |             password: 'admin2025'
   11 |         }
   12 |     });
   13 |
>  14 |     expect(response.status()).toBe(200);
      |                               ^ Error: expect(received).toBe(expected) // Object.is equality
   15 |     expect(response.statusText()).toEqual("OK");
   16 |     const body = await response.json();
   17 |     expect(body.message).toBe('Admin registered successfully');
   18 |
   19 | });
   20 |
   21 |
   22 | test('Create admin without name', async ({ }) => {
   23 |     const context = await request.newContext();
   24 |
   25 |     const response = await context.post('/admin/register', {
   26 |         data: {
   27 |             userName: '',
   28 |             email: generateCustomEmail(),
   29 |             password: 'admin2025'
   30 |         }
   31 |     });
   32 |
   33 |     expect(response.status()).toBe(400);
   34 |     expect(response.statusText()).toEqual("Bad Request");
   35 |     const body = await response.json();
   36 |     expect(body.error).toBe('Username is required');
   37 |
   38 | });
   39 |
   40 |
   41 | test('Create admin without email', async ({ }) => {
   42 |     const context = await request.newContext();
   43 |
   44 |     const response = await context.post('/admin/register', {
   45 |         data: {
   46 |             userName: 'Admin Fayza',
   47 |             email: '',
   48 |             password: 'admin2025'
   49 |         }
   50 |     });
   51 |
   52 |     expect(response.status()).toBe(400);
   53 |     expect(response.statusText()).toEqual("Bad Request");
   54 |     const body = await response.json();
   55 |     expect(body.error).toBe('Email is required');
   56 |
   57 | });
   58 |
   59 | test('Create admin with invalid email', async ({ }) => {
   60 |     const context = await request.newContext();
   61 |     const response = await context.post('/admin/register', {
   62 |         data: {
   63 |             userName: 'Admin Fayza',
   64 |             email: 'faytest',
   65 |             password: '123456789'
   66 |         }
   67 |     });
   68 |
   69 |     expect(response.status()).toBe(400);
   70 |     expect(response.statusText()).toEqual("Bad Request");
   71 |     const body = await response.json();
   72 |     expect(body.error).toBe('Invalid email format');
   73 |
   74 | });
   75 | test('Create admin without password', async ({ }) => {
   76 |     const context = await request.newContext();
   77 |     const response = await context.post('/admin/register', {
   78 |         data: {
   79 |             userName: 'Admin Fayza',
   80 |             email: generateCustomEmail(),
   81 |             password: ''
   82 |         }
   83 |     });
   84 |
   85 |     expect(response.status()).toBe(400);
   86 |     expect(response.statusText()).toEqual("Bad Request");
   87 |     const body = await response.json();
   88 |     expect(body.error).toBe('Password is required');
   89 |
   90 | });
   91 |
   92 | test('Create admin with invalid password', async ({ }) => {
   93 |     const context = await request.newContext();
   94 |     const response = await context.post('/admin/register', {
   95 |         data: {
   96 |             userName: 'Admin Fayza',
   97 |             email: generateCustomEmail(),
   98 |             password: '123'
   99 |         }
  100 |     });
  101 |
  102 |     expect(response.status()).toBe(400);
  103 |     expect(response.statusText()).toEqual("Bad Request");
  104 |     const body = await response.json();
  105 |     expect(body.error).toBe('Password must be at least 6 characters long');
  106 |
  107 | });
  108 |
  109 |
  110 |
  111 |
  112 |
  113 |
  114 |
```