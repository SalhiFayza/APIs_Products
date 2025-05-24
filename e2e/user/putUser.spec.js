import { test, expect, request } from '@playwright/test';

test('update user with valid data', async () => {
    const validId='68321f20885a10c597494033';
    const context = await request.newContext();
    const response = await context.patch(`/user/edit/${validId}`, {
        data: {
            image:"https://letsenhance.io/MainBefore.jpg",
            userName: "Salhi Update",
            email: "fayzaupdate@gmail.com",
            password: "password209"
        }
      });    expect(response.status()).toBe(200);
    expect(response.statusText()).toEqual("OK");
    const body = await response.json();
    expect(body.message).toContain('User updated');
});

test('update user with invalid email', async () => {
    const validId='6830cbbe8a7f4c1c3a8df67c';
    const context = await request.newContext();
    const response = await context.patch(`/user/edit/${validId}`, {
        data: {
            image:"https://letsenhance.io/MainBefore.jpg",
            userName: "Salhi Update",
            email: "fayzaupdate",
            password: "password209"
        }
      });    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toContain('"email" must be a valid email');
});

test('update user with invalid password', async () => {
    const validId='6830cbbe8a7f4c1c3a8df67c';
    const context = await request.newContext();
    const response = await context.patch(`/user/edit/${validId}`, {
        data: {
            image:"https://letsenhance.io/MainBefore.jpg",
            userName: "Salhi Update",
            email: "fayzaupdate@gmail.com",
            password: "pas"
        }
      });    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toContain('"password" length must be at least 6 characters long');
}); 

test('update user with empty image', async () => {
    const validId='6830cbbe8a7f4c1c3a8df67c';
    const context = await request.newContext();
    const response = await context.patch(`/user/edit/${validId}`, {
        data: {
            image:"",
            userName: "Salhi Update",
            email: "fayzaupdate@gmail.com",
            password: "passsword2025"
        }
      });    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toContain('"image" is not allowed to be empty');
});
test('update user with empty email', async () => {
    const validId='6830cbbe8a7f4c1c3a8df67c';
    const context = await request.newContext();
    const response = await context.patch(`/user/edit/${validId}`, {
        data: {
            image:"https://letsenhance.io/MainBefore.jpg",
            userName: "Salhi Update",
            email: "",
            password: "password2025"
        }
      });    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toContain('"email" is not allowed to be empty');
});

test('update user with empty passowrd', async () => {
    const validId='6830cbbe8a7f4c1c3a8df67c';
    const context = await request.newContext();
    const response = await context.patch(`/user/edit/${validId}`, {
        data: {
            image:"https://letsenhance.io/MainBefore.jpg",
            userName: "Salhi Update",
            email: "fayzatest@gmail.com",
            password: ""
        }
      });    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toContain('"password" is not allowed to be empty');
});

test('update user with empty userName', async () => {
    const validId='6830cbbe8a7f4c1c3a8df67c';
    const context = await request.newContext();
    const response = await context.patch(`/user/edit/${validId}`, {
        data: {
            image:"https://letsenhance.io/MainBefore.jpg",
            userName: "",
            email: "fayzatest@gmail.com",
            password: "password2025"
        }
      });    expect(response.status()).toBe(400);
    expect(response.statusText()).toEqual("Bad Request");
    const body = await response.json();
    expect(body.error).toContain('"userName" is not allowed to be empty');
});