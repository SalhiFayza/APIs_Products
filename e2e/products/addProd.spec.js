import { test, expect } from '@playwright/test';

test.describe('Admin creates a product', () => {
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

    test('Create product with valid data', async ({ request }) => {
        const productData = {
            image: "https://t4.ftcdn.net/jpg/01/16/61/93/360_F_116619399_YA611bKNOW35ffK0OiyuaOcjAgXgKBui.jpg",
            nameProduct: "Coffee",
            Description: "Coffee is a beverage brewed from roasted, ground coffee beans",
            priceProduct: 10
        };

        const createResponse = await request.post('/product/add', {
            data: productData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(createResponse.status()).toBe(201);
        expect(createResponse.statusText()).toBe("Created")
        const createBody = await createResponse.json();

        expect(createBody).toHaveProperty('product');
        expect(createBody.product.nameProduct).toBe(productData.nameProduct);
        expect(createBody).toHaveProperty('message', 'Product created successfully');
    });


    test('Create product with empty data', async ({ request }) => {
        const createResponse = await request.post('/product/add', {
            data: {
                image: "",
                nameProduct: "",
                Description: "",
                priceProduct: ""
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(createResponse.status()).toBe(400);
        expect(createResponse.statusText()).toBe("Bad Request");

        const responseBody = await createResponse.json();
        expect(responseBody.errors).toContain('Image is required');
        expect(responseBody.errors).toContain('NameProduct is required');
        expect(responseBody.errors).toContain('Description is required');
        expect(responseBody.errors).toContain('PriceProduct is required');
    });


    test('Should fail without auth token', async ({ request }) => {
        const response = await request.post('/product/add', {
            data: {
                image: 'https://example.com/image.jpg',
                nameProduct: 'Latte',
                Description: 'Latte art is a technique of drawing patterns on the surface of coffee with milk.',
                priceProduct: 4,
            },
        });

        expect(response.status()).toBe(401);
        const responseBody = await response.json();
        expect(responseBody.message).toMatch(/access denied/i);
    });

    test('Should fail with negative price', async ({ request }) => {
        const response = await request.post('/product/add', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                image: 'https://example.com/image.jpg',
                nameProduct: 'Mocaccino',
                Description: 'Mocaccino is a hot drink invented in Italy consisting of cappuccino , cream and chocolate , all mixed with cocoa powder .',
                priceProduct: -10,
            },
        });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.errors).toContain('PriceProduct must be a positive number');
    });

});
