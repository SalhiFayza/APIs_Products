const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');
const authAdmin = require('../middlewares/authAdmin');

router.post('/product/add', authAdmin, (req, res) => {
    const { image, nameProduct, Description, priceProduct } = req.body;
    const errors = [];

    if (!image || image.trim() === '') errors.push('Image is required');
    if (!nameProduct || nameProduct.trim() === '') errors.push('NameProduct is required');
    if (!Description || Description.trim() === '') errors.push('Description is required');

    if (priceProduct === '' || priceProduct == null) {
        errors.push('PriceProduct is required');
    } else if (isNaN(priceProduct) || Number(priceProduct) < 0) {
        errors.push('PriceProduct must be a positive number');
    }
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    productModel.postNewProduct(image, nameProduct, Description, priceProduct)
        .then(product => res.status(201).json({ product, message: 'Product created successfully' }))
        .catch(err => res.status(400).json({ error: err }));
});
router.get('/products', (req, res) => {
    productModel.getAllProducts()
        .then(products => res.status(200).json(products))
        .catch(err => res.status(500).json({ error: err }));
});

router.get('/product/:id', (req, res) => {
    const id = req.params.id;
    productModel.getOneProduct(id)
        .then(product => {
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(product);
        })
        .catch(err => res.status(500).json({ error: err }));
});

router.put('/product/edit/:id', authAdmin, (req, res) => {
    const id = req.params.id;
    const { image, nameProduct, Description, priceProduct } = req.body;

    if (!image) return res.status(400).json({ error: 'Image is required' });
    if (!nameProduct) return res.status(400).json({ error: 'NameProduct is required' });
    if (!Description) return res.status(400).json({ error: 'Description is required' });
    if (priceProduct == null) return res.status(400).json({ error: 'PriceProduct is required' });

    productModel.updateOneProduct(id, image, nameProduct, Description, priceProduct)
        .then(result => {
            if (result.modifiedCount === 0) {
                return res.status(404).json({ message: 'Product not found or no changes made' });
            }
            res.status(200).json({ message: 'Product updated successfully' });
        })
        .catch(err => res.status(400).json({ error: err }));
});


router.delete('/product/delete/:id', authAdmin, (req, res) => {
    const id = req.params.id;

    productModel.deleteOneProduct(id)
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        })
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
