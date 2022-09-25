const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models')


const generateJwt = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '48h' }
    );
}

class UserController {
    async registration(req, res, next) {
        const { email, password, nickname } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Не задан email или пароль'));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }
        const hashPassword = await bcrypt.hash(password, 4);
        const user = await User.create({ email, password: hashPassword, nickname: nickname || email });
        const token = generateJwt(user.id, email);
        return res.json(token);
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.badRequest('Неверный email или пароль'));
        }
        let samePasswords = bcrypt.compareSync(password, user.password);
        if (!samePasswords) {
            return next(ApiError.badRequest('Неверный email или пароль'));
        }
        const token = generateJwt(user.id, user.email);
        return res.json({ token });
    }
    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email);
        return res.json({ token });
    }
}

module.exports = new UserController()