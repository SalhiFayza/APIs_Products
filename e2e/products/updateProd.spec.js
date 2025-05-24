const { test, expect } = require('@playwright/test');

test.describe('Admin updates a product', () => {
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
    console.log('Token:', token); // Debug token
    expect(token).toBeTruthy();
  });

  test('Update product by invalid id', async ({ request }) => {
    const invalidProductId = '000000000000000000000000'; // valid ObjectId format but non-existent
    const response = await request.put(`/product/edit/${invalidProductId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        image: "https://example.com/image.jpg",
        nameProduct: "New Product",
        description: "This is a great product",
        priceProduct: 9.02,
      },
    });

    if (response.status() !== 404) {
      console.log('Response body for invalid ID:', await response.json());
    }

    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body).toEqual({ message: "Product not found or no changes made" });
  });

  test('Update product without Token', async ({ request }) => {
    const productId = '68320b73d1c90ef9ba8266df'; // existing product ID
    const response = await request.put(`/product/edit/${productId}`, {
      data: {
        image: "https://example.com/image.jpg",
        nameProduct: "New Product",
        description: "This is a great product",
        priceProduct: 450,
      },
    });

    if (response.status() !== 401) {
      console.log('Response body without token:', await response.json());
    }

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body).toEqual({ message: "Access denied. No token provided." });
  });

  test('Update product by valid id', async ({ request }) => {
    const productId = '68320b73d1c90ef9ba8266df'; // existing product ID
    const response = await request.put(`/product/edit/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        image: "https://example.com/image.jpg",
        nameProduct: "New Product 200",
        description: "This is a product 200",
        priceProduct: 42,
      },
    });

    if (response.status() !== 200) {
      console.log('Response body for valid update:', await response.json());
    }

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ message: "Product updated successfully" });
  });
});
