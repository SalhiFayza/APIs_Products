import { test, expect } from '@playwright/test';


test.describe('Admin delete a product', () => {
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

    test('Delete product by id', async ({ request }) => {
        const productId = '683228c17e083b0cfd3ecae9';
        const response = await request.delete(`/product/delete/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe("OK");
        const body = await response.json();
        expect(body).toEqual({ message: "Product deleted successfully" });
    });
    test('Delete product by invalid id', async ({ request }) => {
        const productId = '000000000000000000000000';
        const response = await request.delete(`/product/delete/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        expect(response.status()).toBe(404);
        expect(response.statusText()).toBe("Not Found");
        const body = await response.json();
        expect(body).toEqual({ message: "Product not found" });
    });


    test('Delete product without token', async ({ request }) => {
        const productId = '68321c5d6db301eee1ca271e';
        const response = await request.delete(`/product/delete/${productId}`);

        expect(response.status()).toBe(401);
        expect(response.statusText()).toBe("Unauthorized");
        const body = await response.json();
        expect(body).toEqual({ message: "Access denied. No token provided." });
    });
});