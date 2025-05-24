import { test, expect, request } from '@playwright/test';

test('Create user with specific email format', async ({}) => {
  const context = await request.newContext();

  const response = await context.post('/register', {
    data: {
      userName: 'Salhi Fayza',
      email: generateCustomEmail(),
      password: '123456789'
    }
  });

  expect(response.status()).toBe(200);
  expect(response.statusText()).toEqual("OK");
  const body = await response.json();
  expect(body.message).toBe('User registered successfully');

});

test('Create user inwith email format', async ({}) => {
    const context = await request.newContext();

    const response = await context.post('/register', {
      data: {
        userName: 'Salhi Fayza',
        email: 'fayza',
        password: '123456789'
      }
    });

    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");

    const body = await response.json();
    expect(body.error).toContain('"email" must be a valid email');

  });
  test('should return error when userName is empty', async ({ request }) => {
    const response = await request.post('/register', {
      data: {
        userName: '',
        email: 'fayza@gamil.com',
        password: 'password2025'
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('"userName" is not allowed to be empty');

  });

  test('should return error when email is empty', async ({ request }) => {
    const response = await request.post('/register', {
      data: {
        userName: 'Fayza Salhi',
        email: '',
        password: 'password2025'
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('"email" is not allowed to be empty');

  });

  test('should return error when password is empty', async ({ request }) => {
    const response = await request.post('/register', {
      data: {
        userName: 'Fayza Salhi',
        email: 'fayzatest@gmail.com',
        password: ''
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('"password" is not allowed to be empty');

  });
//-------------------------------- 🥇
function generateCustomEmail() {
    const digits = Math.floor(Math.random() * 90 + 10); // Two digits (10–99)
    const letters = String.fromCharCode(
      97 + Math.floor(Math.random() * 26),
      97 + Math.floor(Math.random() * 26)
    );
  // Generate email like fayza21ab@gmail.com
    return `fayza${digits}${letters}@gmail.com`;
  }