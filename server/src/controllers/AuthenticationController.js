const Account = require('../models/Account');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthenticationController {
    async login(req, res) {
        const { username, password } = req.body;
        console.log(username, password);
        try {
            const account = await Account.findOne({ where: { username } });

            if (!account) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const validPassword = await bcrypt.compare(password, account.password);
            // const validPassword = password === account.password;
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            await Account.update({ status: 1 }, { where: { idaccount: account.idaccount } });

            const token = jwt.sign({
                id: account.idaccount,
                username: account.username,
                role: account.role,
            }, process.env.JWT_SECRET || 'gorth', { expiresIn: '1h' });
            // const token = jwt.sign({ id: account.idaccount, username: account.username }, 'gorth', { expiresIn: '1h' });

            return res.json({ message: 'Login successful', token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    async logout(req, res) {
        const { id } = req.user;
        console.log(req.user)
        try {
            await Account.update({ status: 0 }, { where: { idaccount: id } });
            return res.json({ message: 'Logout successful' });
        } catch (error) {
            res.status(500).json({ message: 'Logout failed J', error });
        }

        // try {
        //     const userId = req.user.id; // Lấy userId từ token hoặc session
        //     const account = await Account.findByPk(userId);
        //
        //     if (!account) {
        //         return res.status(404).json({ message: 'User not found' });
        //     }
        //
        //     // Cập nhật status về 0
        //     account.status = 0;
        //     await account.save();
        //
        //     res.json({ message: 'Logged out successfully' });
        // } catch (error) {
        //     return res.status(500).json({ message: 'Server error', error });
        // }
    }

    async register(req, res) {
        const { username, password, email, firstname, lastname, phone, avatar } = req.body;

        console.log(req.body);
        try {
            const existingAccount = await Account.findOne({ where: { username } });
            if (existingAccount) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newAccount = await Account.create({
                username,
                password: hashedPassword,
                email,
                role: 0,
                status: 0,
            });

            const newUser = await User.create({
                idaccount: newAccount.idaccount,
                firstname,
                lastname,
                phone_number: phone,
                avatar: null,
            });

            return res.status(201).json({
                message: 'User registered successfully',
                account: newAccount,
                user: newUser
            });

        } catch (error) {
            return res.status(500).json({ error: 'Error registering user' });
        }
    }
}

module.exports = new AuthenticationController()
