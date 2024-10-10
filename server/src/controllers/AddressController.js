const Address = require('../models/Address');

class AddressController {
    async getAllAddresses(req, res) {
        try {
            const addresses = await Address.findAll();
            res.json(addresses);
        } catch (error) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi lấy dữ liệu' });
        }
    };

    async getAddressById(req, res) {
        const { id } = req.params;
        try {
            const address = await Address.findByPk(id);
            if (address) {
                res.json(address);
            } else {
                res.status(404).json({ error: 'Địa chỉ không tồn tại' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi lấy dữ liệu' });
        }
    };
}

module.exports = new AddressController()
