import {test, expect} from '@playwright/test';

test('Get user by valid id', async({request})=>{
const validId = '68309a7110a82a5bca28b4c1';
const response = await request.get(`/user/${validId}`);
expect(response.status()).toBe(200);
expect(body._id).toBe(validId);


})

test('Get user by invalid id', async({request})=>{
    const invalidId = '682f24af6c3d252564cc4218';
    const response = await request.get(`/user/${invalidId}`);
    expect(response.status()).toBe(404);
    expect(response.statusText()).toEqual("Not Found");
    const body = await response.json();
  expect(body).toMatchObject({
    "message": "User not found"
  });
    })