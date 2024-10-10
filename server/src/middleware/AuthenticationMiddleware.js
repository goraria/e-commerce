const jwt = require('jsonwebtoken');

const AuthenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token format invalid' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'gorth', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }

        req.user = user;
        next();
    });

    // const token = req.headers['authorization'];
    //
    // if (!token) {
    //     return res.status(403).json({message: 'No token provided'});
    // }
    //
    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gorth');
    //     req.user = decoded;
    //
    //     const account = await Account.findOne({where: {idaccount: decoded.id}});
    //
    //     if (!account || account.status !== 1) {
    //         return res.status(401).json({message: 'User not logged in or status is not active'});
    //     }
    //
    //     next();
    // } catch (error) {
    //     return res.status(401).json({message: 'Unauthorized', error});
    // }

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = decoded;
    //     next();
    // } catch (error) {
    //     return res.status(401).json({message: 'Unauthorized'});
    // }
};

module.exports = AuthenticationMiddleware;
