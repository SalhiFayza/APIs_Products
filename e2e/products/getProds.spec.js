import { test, expect } from "@playwright/test";


test.describe('Admin get a products', () => {
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

    test('Get all products', async({request }) => {
        const response = await request.get('/products',{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe("OK");
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
    });


    test('Get all products by invalid endpoint', async({request }) => {
        const response = await request.get('/productss',{ headers: {
            Authorization: `Bearer ${token}`,
        }
    });
        expect(response.status()).toBe(404);
        expect(response.statusText()).toBe("Not Found");
       });
});