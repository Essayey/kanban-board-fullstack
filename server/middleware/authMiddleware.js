const ApiError = require("../error/ApiError")
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return next(ApiError.unauthorized('Пользователь не авторизован'))
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded
        next()
    } catch (e) {
        next(ApiError.unauthorized('Пользователь не авторизован'))
    }
}