const express = require('express'),
    auth = require('./auth.service'),
    router = express.Router(),
    usersInfo = require('./../data/usersInfo');


router.get('/user/info', (req, res) => (req, res) => {
    const payload = auth(req, res)
    const user = find(usersInfo, (user) => user.userId === payload.id)
    user ? res.status(200).json(user) : console.error('err')
})
