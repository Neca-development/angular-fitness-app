const express = require('express'),
    router = express.Router(),
    auth = require('./../api/auth.service'),
    abonements = require('./../data/abonements.json')

router.get('/getinfo', (req, res) => {
    const payload = auth.checkAuth(req, res)
    const user = abonements.find((user) => user.userId === payload.id)

    const response = { data: user}

    user ? res.status(200).json(response) : console.error('err') //TODO: use if
})

module.exports = router