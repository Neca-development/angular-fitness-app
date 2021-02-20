const express = require('express'),
    router = express.Router(),
    auth = require('./../api/auth.service'),
    abonements = require('./../data/abonements.json')

router.get('/getinfo', (req, res) => {
    const payload = auth.checkAuth(req, res)
    const user = abonements.find((user) => user.userId === payload.id)
    user ? res.status(200).json(user) : console.error('err')
})

module.exports = router