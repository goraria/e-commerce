// controllers/AccountController.js
const Account = require('../models/Account');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
require('dotenv').config();
class AccountController {
    static async sendResetPasswordEmail(email, token, req, res) {
        const resetUrl = `http://localhost:5173/reset-password?token=${token}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APSS,
            },
        });
        //process.env.EMAIL_USER
        const mailOptions = {
            from: "Gorth Inc.",
            to: email,
            subject: 'Reset Password',
            html: `<p>Click the link to reset your password:</p><a href="${resetUrl}">Reset password</a>`,
        };

        try {
            await transporter.sendMail(mailOptions);
            // console.log('Confirmation email sent successfully');
        } catch (error) {
            // console.error('Error sending confirmation email:', error);
            console.log(error)
            return res.status(500).json({ error: 'Error reset password' });
        }
    }
    async ForgotPassword(req, res) {
        try {
            const { email } = req.body;
            console.log(email)
            const user = await Account.findOne({ where: { email: email } });

            if (!user) {
                return res.status(400).json({ message: 'Email không tồn tại!' });
            }
            const token = crypto.randomBytes(20).toString('hex');
            const accountToken = {
                verificationtoken: token
            }
            await user.update(accountToken);
            await AccountController.sendResetPasswordEmail(email, token, req, res);
            res.json({ message: 'Một email đã được gửi để bạn đặt lại mật khẩu!' });
        } catch (error) {
            console.log(error)
        }
    };
    async ResetPassword(req, res) {
        const { token, newPassword } = req.body;
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await Account.findOne({
            where: {
                verificationtoken: token,
            }
        });
        if (!user) {
            return res.status(400).json({ message: 'Token không hợp lệ!' });
        }
        const userData = {
            password: hashedPassword,
            verificationtoken: null
        }
        await user.update(userData);
        res.json({ message: 'Mật khẩu của bạn đã được đặt lại' });
    };
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