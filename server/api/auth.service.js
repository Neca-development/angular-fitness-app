const jwt = require('jsonwebtoken');
const tokenKey = '1a2b-3c4d-5e6f-7g8h'

const checkAuth = (req, res) => {
    if (req.headers.authorization) {
        return jwt.verify(
            req.headers.authorization,
            tokenKey
        )
    }
    else
        return res
            .status(401)
            .json({ message: 'Not authorized' })
}

const checkAdmin = (res, req) => {
    const admin = checkAuth(res, req)
    if (admin.role === 'admin') return admin
    return false
}

module.exports = { checkAuth, checkAdmin }