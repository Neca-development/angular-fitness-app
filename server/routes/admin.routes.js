const express = require('express'),
    router = express.Router(),
    auth = require('./../api/auth.service'),
    usersInfo = require('./../data/usersInfo.json')

router.get('/get-all-users', (req, res) => {
    const admin = auth.checkAdmin(req, res)

    admin ? res.status(200).json({ data: usersInfo }) : console.error('err')
})

module.exports = router