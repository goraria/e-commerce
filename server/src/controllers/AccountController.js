// controllers/AccountController.js
const Account = require('../models/Account');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const fs = require('fs');
require('dotenv').config();

class AccountController {
    async getAccountInfo(req, res) {
        try {
            const account = await Account.findByPk(req.user.id);
            const accuser = await User.findOne({ where: { idaccount: req.user.id } });
            // console.log(account, accuser)
            if (account && accuser) {
                res.json({
                    iduser: account.idaccount,
                    username: account.username,
                    email: account.email,
                    firstname: accuser.firstname,
                    lastname: accuser.lastname,
                    phone: accuser.phone_number,
                    avatar: accuser.avatar
                });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    async setAccountInfo(req, res) {
        // console.log(req.body);
        try {
            const account = await Account.findByPk(req.user.id);
            const accuser = await User.findOne({ where: { idaccount: req.user.id } });

            if (!account || !accuser) {
                return res.status(404).json({ error: 'Tài khoản hoặc người dùng không tồn tại' });
            }

            const accountData = {
                username: req.body.username,
                email: req.body.email
            };

            const userData = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone_number: req.body.phone
            };

            await account.update(accountData);
            await accuser.update(userData);

            res.json({
                message: 'Cập nhật thông tin tài khoản và người dùng thành công',
                account,
                user: accuser
            });
        } catch (error) {
            // console.error('Lỗi khi cập nhật thông tin tài khoản và người dùng:', error);
            res.status(500).json({ error: 'Có lỗi xảy ra khi cập nhật thông tin' });
        }
    }
    async UploadAvatar(req, res) {
        try {
            const avatarPath = path.join(__dirname, 'avatar');
            if (!fs.existsSync(avatarPath)) {
                fs.mkdirSync(avatarPath, { recursive: true });
            }
            const filePath = path.join('avatar', req.file.filename);
            // Bạn có thể lưu `filePath` vào database, ví dụ:
            const user = await User.findOne({ where: { idaccount: req.user.id } });
            // await User.update({ avatar: filePath }, { where: { id: req.user.id } });
            await user.update({ avatar: filePath })

            res.status(200).json({ message: 'Avatar uploaded successfully', avatarPath: filePath });
        } catch (error) {
            res.status(500).json({ message: 'Failed to upload avatar', error: error.message });
        }
    }
}

module.exports = new AccountController();