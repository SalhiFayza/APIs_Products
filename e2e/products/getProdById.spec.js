import { test, expect } from "@playwright/test";


test.describe('Admin get a product by id', () => {
    let token;

    test.beforeAll(async ({ request }) => {
        const loginResponse = await request.post('/admin/login', {
            data: {
                email: 'adminfayza@gmail.com',
                password: 'admin123dd',
            },
        });
        expect(loginResponse.ok()).toBeTruthy();
        const loginBody = await loginResponse.json();
        token = loginBody.token;
        expect(token).toBeTruthy();
    });

    test('Get product by id', async({request }) => {
        const prodId = '68320b73d1c90ef9ba8266df';
        const response = await request.get(`/product/${prodId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe("OK");
        const body = await response.json();
        expect(body._id).toBe(prodId);
    });


    test('Get product by invalid id', async({request }) => {
        const prodId = '682f24af6c3d252564cc4218';
        const response = await request.get(`/product/${prodId}`,{ headers: {
            Authorization: `Bearer ${token}`,
        }
    });
        expect(response.status()).toBe(404);
        expect(response.statusText()).toBe("Not Found");
        const body = await response.json();
        expect(body.message).toMatchObject("Product not found");
    });

});