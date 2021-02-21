const express = require('express'),
    router = express.Router(),
    auth = require('./../api/auth.service'),
    usersInfo = require('./../data/usersInfo.json')

router.get('/getinfo', (req, res) => {
    const payload = auth.checkAuth(req, res)
    const user = usersInfo.find((user) => user.userId === payload.id)

    const response = { data: user}

    user ? res.status(200).json(response) : console.error('err')
})

module.exports = router