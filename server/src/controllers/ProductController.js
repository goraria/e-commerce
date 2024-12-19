const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const Description = require('../models/Description');
const Configuration = require('../models/Configuration')
const Rating = require("../models/Rating")
const Color = require("../models/Color")
const { Op, where } = require("sequelize");
const Category = require("../models/Category")

class ProductController {
    async loadProduct(req, res) {
        try {
            const products = await Product.findAll({ where: { status: 1 } });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }

    async loadAllProduct(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }

    async loadProductWithID(req, res) {
        const { idProduct } = req.params; // Retrieve idProduct from request parameters
        try {
            const products = await Product.findAll({
                where: {
                    idProduct: idProduct
                }
            });

            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }

    async loadDescription(req, res) {
        const { idProduct } = req.params; // Retrieve idProduct from request parameters
        // console.log(req.params)
        try {
            // Find descriptions where idProduct matches the provided id
            const description = await Description.findAll({
                where: {
                    idProduct: idProduct
                }
            });

            // If descriptions are found, return them, otherwise return a 404
            if (description.length > 0) {
                res.status(200).json(description);
            } else {
                res.status(404).json({ message: `No descriptions found for product with id ${idProduct}` });
            }

        } catch (error) {
            res.status(500).json({ message: 'Error fetching descriptions', error });
        }
    }

    async loadConfiguration(req, res) {
        const { idProduct } = req.params; // Retrieve idProduct from request parameters

        try {
            // Find descriptions where idProduct matches the provided id
            const configuration = await Configuration.findAll({
                where: {
                    idProduct: idProduct
                }
            });

            // If configurations are found, return them, otherwise return a 404
            if (configuration.length > 0) {
                res.status(200).json(configuration);
            } else {
                res.status(404).json({ message: `No configurations found for product with id ${idProduct}` });
            }

        } catch (error) {
            res.status(500).json({ message: 'Error fetching configurations', error });
        }
    }

    async loadConfigurationByID(req, res) {
        const { idConfiguration } = req.params; // Retrieve idProduct from request parameters

        try {
            // Find descriptions where idProduct matches the provided id
            const configuration = await Configuration.findAll({
                where: {
                    idconfiguration: idConfiguration
                }
            });

            // If configurations are found, return them, otherwise return a 404
            if (configuration.length > 0) {
                res.status(200).json(configuration);
            }

        } catch (error) {
            res.status(500).json({ message: 'Error fetching configurations', error });
        }
    }

    async loadRating(req, res) {
        const { idProduct } = req.params; // Retrieve idProduct from request parameters

        try {
            // Find descriptions where idProduct matches the provided id
            const rating = await Rating.findAll({
                where: {
                    idProduct: idProduct
                }
            });

            // If ratings are found, return them, otherwise return a 404
            if (rating.length > 0) {
                res.status(200).json(rating);
            } else {
                res.status(404).json({ message: `No ratings found for product with id ${idProduct}` });
            }

        } catch (error) {
            res.status(500).json({ message: 'Error fetching ratings', error });
        }
    }

    async loadColor(req, res) {
        const { idProduct } = req.params; // Retrieve idProduct from request parameters

        try {
            // Find descriptions where idProduct matches the provided id
            const colors = await Color.findAll({
                where: {
                    idProduct: idProduct
                }
            });

            // If ratings are found, return them, otherwise return a 404
            if (colors.length > 0) {
                res.status(200).json(colors);
            } else {
                res.status(404).json({ message: `No ratings found for product with id ${idProduct}` });
            }

        } catch (error) {
            res.status(500).json({ message: 'Error fetching ratings', error });
        }
    }

    async loadProductWithBrand(req, res) {
        const { Brand } = req.params; // Retrieve idProduct from request parameters

        try {
            // Find descriptions where idProduct matches the provided id
            const product = await Product.findAll({
                where: {
                    brand: Brand,
                    status: 1
                }
            });

            // If ratings are found, return them, otherwise return a 404
            if (product.length > 0) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: `No ratings found for product with id ` });
            }

        } catch (error) {
            res.status(500).json({ message: 'Error fetching ratings', error });
        }
    }

    async loadProductWithName(req, res) {
        const { Name } = req.params; // Retrieve idProduct from request parameters

        try {
            // Find descriptions where idProduct matches the provided id
            const product = await Product.findAll({
                where: {
                    product_name: {
                        [Op.like]: `%${Name}%`
                    }
                }
            });

            // If ratings are found, return them, otherwise return a 404
            if (product.length > 0) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: `No ratings found for product with id ` });
            }

        } catch (error) {
            res.status(500).json({ message: 'Error fetching ratings', error });
        }
    }

    async loadProductWithCondition(req, res) {
        const { CPU } = req.params;

        try {
            // Columns to check in the Configuration table
            const columnsToCheck = ['cpu', 'ram', 'gpu', 'storage', 'screen'];
            let matchingColumn = null;
            let product = null;

            // Loop through columns and find the first match for CPU value
            for (const column of columnsToCheck) {
                product = await Configuration.findAll({
                    where: { [column]: CPU }
                });

                if (product.length > 0) {
                    matchingColumn = column;
                    break; // Stop once a match is found
                }
            }

            // If a match was found, return the results
            if (matchingColumn) {
                res.status(200).json(product);
            } else {
                // If no matching column was found, return a 404
                res.status(404).json({ message: `No products found matching the value '${CPU}'` });
            }

        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }
    async updateProductName(req, res) {
        const { idProduct } = req.params;
        const updatedData = req.body; // Giả sử dữ liệu cập nhật được gửi từ client trong body
        const idcategory = parseInt(updatedData.idcategory, 10);
        try {

            const product = await Product.findOne({
                where: { idProduct: idProduct },
            });
            const category = await Category.findOne({
                where: { idcategory: idcategory },
            });
            if (!product) {
                return res.status(404).json({ message: `No account found with id ${idProduct}` });
            }

            await category.update({
                where: {
                    idcategory: idcategory
                },
                category_name: updatedData.category_name
            });

            await product.update({
                product_name: updatedData.product_name,
                brand: updatedData.brand,
            });

            // await t.commit(); // Cam kết transaction
            res.status(200).json({ success: true, message: 'User updated successfully', data: updatedData });

        } catch (error) {
            // console.error('Error updating product name:', error);
            res.status(500).json({ success: false, message: 'Error updating product name', error });
        }
    }
    async deleteProductName(req, res) {
        try {
            const { idProduct } = req.params
            // console.log(idProduct)
            const product = await Product.findOne({
                where: {
                    idProduct: idProduct
                }
            });

            await product.destroy();
            res.status(200).json({ success: true, message: 'Product name deleted successfully' });
        } catch (error) {
            // console.error('Error deleting product name:', error);
            res.status(500).json({ success: false, message: 'Error deleting product name', error });
        }
    }

    async createProductName(req, res) {
        const Data = req.body; // Giả sử dữ liệu cập nhật được gửi từ client trong body
        try {

            const newProduct = await Product.create({
                product_name: Data.product_name,
                brand: Data.brand,
                idcategory: Data.idcategory,
                product_image: Data.product_image
            });

            // console.log('Product created successfully:', newProduct);
            return res.status(201).json({
                product: newProduct,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error create user', error });
        }
    }

    async createDescription(req, res) {
        const Data = req.body; // Giả sử dữ liệu cập nhật được gửi từ client trong body
        try {

            const newDescription = await Description.create({
                idProduct: Data.idProduct,
                description: Data.description,
            });

            // console.log('Description created successfully:', newDescription);
            return res.status(201).json({
                description: newDescription,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error create user', error });
        }
    }

    async updateStatus(req, res) {
        const { idProduct } = req.params;
        const updatedData = req.body; // Giả sử dữ liệu cập nhật được gửi từ client trong body

        try {
            const product = await Product.findOne({
                where: { idProduct: idProduct },
            });

            if (!product) {
                return res.status(404).json({ message: `No account found with id ${idProduct}` });
            }

            await product.update({
                status: updatedData.status
            });

            res.status(200).json({ success: true, message: 'User updated successfully', data: updatedData });

        } catch (error) {
            // console.error('Error updating product name:', error);
            res.status(500).json({ success: false, message: 'Error updating product name', error });
        }
    }
}

module.exports = new ProductController();
