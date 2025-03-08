// controllers/AccountController.js
const Account = require('../models/Account');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const axios = require("axios");
require('dotenv').config();

class AccountController {
    async getHistory(req, res) {
        try {
            console.log(req.user.id)
            const conversations = await Conversation.findAll({
                where: {
                    idaccount: req.user.id,
                }
            });
            res.json(conversations);
        } catch (error) {
            res.json({error: 'Server error'});
        }
    }

    async sendMessage(req, res) {

        try {
            const account = await Account.findByPk(req.user.id);

            if (!account) {
                res.json({error: 'Account not found'});
            }

            const userMessage = await Conversation.create({
                idaccount: account.idaccount,
                message: req.body,
                time: new Date(),
                type: req.user.type,
            })

            res.json({
                message: 'Cập nhật thông tin tài khoản và người dùng thành công',
                account,
                user: accuser
            });
        } catch (error) {
            // console.error('Lỗi khi cập nhật thông tin tài khoản và người dùng:', error);
            // console.log(error);
            res.status(500).json({error: 'Có lỗi xảy ra khi cập nhật thông tin'});
        }
    }

    async responseMessage(req, res) {
        try {
            const userMessage = req.body.message;
            const response = await axios.post(RASA_SERVER_URL, {
                sender: "user",
                message: userMessage,
            });

            const rasaReply = response.data.map((msg) => msg.text).join("\n");

            res.json({reply: rasaReply});
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({error: "Server error"});
        }
    }
}

module.exports = new AccountController();