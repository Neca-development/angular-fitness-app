const jwt = require('jsonwebtoken');
const tokenKey = '1a2b-3c4d-5e6f-7g8h'

const auth = (req, res) => {
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

module.exports = auth