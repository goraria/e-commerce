const Addresses = require('../models/Addresses');
const Users = require('../models/Users')

class AddressController {
    async getAllAddresses(req, res) {
        try {
            const addresses = await Addresses.findAll({ where: { user_id: req.user.id } });
            // console.log(addresses);
            res.json(addresses);
        } catch (error) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi lấy dữ liệu' });
        }
    };

    async getAddressById(req, res) {
        try {
            const address = await Addresses.findByPk(req.params.id);
            if (address) {
                res.json(address);
            } else {
                res.status(404).json({ error: 'Địa chỉ không tồn tại' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi lấy dữ liệu' });
        }
    };

    async createAddress(req, res) {
        const { type, tower, street, district, city, state, country } = req.body;
        // console.log(idaccount, req.body);
        try {
            const address = await Addresses.create({
                user_id: req.user.id,
                type,
                tower,
                street,
                district,
                city,
                state,
                country
            });
            res.json(address);
        } catch (error) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi thêm địa chỉ' });
        }
    };

    async updateAddress(req, res) {
        try {
            const address = await Addresses.findByPk(req.params.id);
            if (address) {
                await address.update(req.body);
                res.json(address);
            } else {
                res.status(404).json({ error: 'Địa chỉ không tồn tại' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi cập nhật địa chỉ' });
        }
    };

    async deleteAddress(req, res) {
        try {
            const address = await Addresses.findByPk(req.params.id);

            if (!address) {
                return res.status(404).json({ error: "Address not found" });
            }

            await address.destroy();
            res.status(200).json({ message: "Address deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to delete address" });
        }
    }

}

module.exports = new AddressController();