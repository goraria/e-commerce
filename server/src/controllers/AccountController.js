// controllers/AccountController.js
const Account = require('../models/Account');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
require('dotenv').config();
class AccountController {
    async changePassword(req, res) {
        try {
            const account = await Account.findByPk(req.user.id);
            // console.log(account, accuser)
            if (account) {
                res.json({
                    username: account.username,
                    email: account.email,
                    firstname: accuser.firstname,
                    lastname: accuser.lastname,
                    phone: accuser.phone_number
                });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
    async getAccountInfo(req, res) {
        try {
            const account = await Account.findByPk(req.user.id);
            const accuser = await User.findOne({ where: { idaccount: req.user.id } });
            // console.log(account, accuser)
            if (account) {
                res.json({
                    username: account.username,
                    email: account.email,
                    firstname: accuser.firstname,
                    lastname: accuser.lastname,
                    phone: accuser.phone_number
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
}

module.exports = new AccountController();