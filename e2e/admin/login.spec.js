import { test, expect, request } from '@playwright/test';

test('login admin with specific email format', async ({ }) => {
    const context = await request.newContext();
    const response = await context.post('/admin/login', {
        data: {
            email: 'adminfayza@gmail.com',
            password: 'admin123dd'
        }
    });
    expect(response.status()).toBe(200);
    expect(response.statusText()).toEqual("OK");
    const body = await response.json();
    expect(body).toHaveProperty('token');
});

test('login admin with invalid email format', async ({ }) => {
    const context = await request.newContext();
    const response = await context.post('/admin/login', {
        data: {
            email: 'adminfayza',
            password: 'admin123dd'
        }
    });
    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toBe("Invalid email or password");
});

test('login admin with invalid password', async ({ }) => {
    const context = await request.newContext();
    const response = await context.post('/admin/login', {
        data: {
            email: 'adminfayza@gmail.com',
            password: '12'
        }
    });
    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.message).toBe('Invalid email or password');
});

test('login admin with empty data', async ({ }) => {
    const context = await request.newContext();
    const response = await context.post('/admin/login', {
        data: {
            email: '',
            password: ''
        }
    });
    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toBe('Invalid email or password');
});