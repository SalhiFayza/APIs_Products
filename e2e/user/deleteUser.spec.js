import { test, expect, request } from '@playwright/test';

test('Delete user with valid id', async () => {
    const validId='68309ab99d0e23599a6db95b';
    const context = await request.newContext();
    const response = await context.delete(`/user/delete/${validId}`);
    expect(response.status()).toBe(200);
    expect(response.statusText()).toEqual("OK");
    const body = await response.json();
    expect(body.message).toContain('User deleted');
});

test('Delete user not exist', async () => {
    const validId='68309960865fc2452e0a3a1c';
    const context = await request.newContext();
    const response = await context.delete(`/user/delete/${validId}`);
    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toEqual('User not found');
});

test('Delete user with invalid id', async () => {
    const validId='123456789';
    const context = await request.newContext();
    const response = await context.delete(`/user/delete/${validId}`);
    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toContain('Invalid user ID');
});
