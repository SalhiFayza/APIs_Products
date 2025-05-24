import { test, expect, request } from '@playwright/test';

test('Create admin with specific email format', async ({ }) => {
    const context = await request.newContext();

    const response = await context.post('/admin/register', {
        data: {
            userName: 'Salhi Fayza',
            email: generateCustomEmail(),
            password: 'admin2025'
        }
    });

    expect(response.status()).toBe(200);
    expect(response.statusText()).toEqual("OK");
    const body = await response.json();
    expect(body.message).toBe('Admin registered successfully');

});


test('Create admin without name', async ({ }) => {
    const context = await request.newContext();

    const response = await context.post('/admin/register', {
        data: {
            userName: '',
            email: generateCustomEmail(),
            password: 'admin2025'
        }
    });

    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toBe('Username is required');

});


test('Create admin without email', async ({ }) => {
    const context = await request.newContext();

    const response = await context.post('/admin/register', {
        data: {
            userName: 'Admin Fayza',
            email: '',
            password: 'admin2025'
        }
    });

    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toBe('Email is required');

});

test('Create admin with invalid email', async ({ }) => {
    const context = await request.newContext();
    const response = await context.post('/admin/register', {
        data: {
            userName: 'Admin Fayza',
            email: 'faytest',
            password: '123456789'
        }
    });

    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toBe('Invalid email format');

});
test('Create admin without password', async ({ }) => {
    const context = await request.newContext();
    const response = await context.post('/admin/register', {
        data: {
            userName: 'Admin Fayza',
            email: generateCustomEmail(),
            password: ''
        }
    });

    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toBe('Password is required');

});

test('Create admin with invalid password', async ({ }) => {
    const context = await request.newContext();
    const response = await context.post('/admin/register', {
        data: {
            userName: 'Admin Fayza',
            email: generateCustomEmail(),
            password: '123'
        }
    });

    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toBe('Password must be at least 6 characters long');

});







//-------------------------------- 🥇
function generateCustomEmail() {
    const digits = Math.floor(Math.random() * 90 + 10); // Two digits (10–99)
    const letters = String.fromCharCode(
        97 + Math.floor(Math.random() * 26),
        97 + Math.floor(Math.random() * 26)
    );
    // Generate email like admin21ab@gmail.com
    return `admin${digits}${letters}@gmail.com`;
}