const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    users = require('./data/users'),
    abonements = require('./data/abonements'),
    lessons = require('./data/lessons'),
    usersInfo = require('./data/usersInfo'),
    auth = require('./api/auth.service')
userService = require('./api/user.service')
path = require('path')
const host = '127.0.0.1'
const port = process.env.PORT || 7000
const { json } = require('body-parser');
const cors = require('cors');
const { find } = require('lodash');

const tokenKey = '1a2b-3c4d-5e6f-7g8h'


app.use(express.json())
app.use(cors())
app.use(bodyParser.json())


app.post('/api/login', (req, res) => {
    const user = find(users, (user) => req.body.login === user.login && req.body.password === user.password)
    if (user)
        return res.status(200).json({
            id: user.id,
            role: user.role,
            token: jwt.sign({ id: user.id, role: user.role }, tokenKey),
        })
    else
        return res.status(404).json({ error: 'Пользователь не найден' })
})

// app.use('/user', userService)
app.get('/user/getinfo', (req, res) => {
    const payload = auth(req, res)
    const user = find(usersInfo, (user) => user.userId === payload.id)
    user ? res.status(200).json(user) : console.error('err')
})

app.get('/abonemets/getinfo', (req, res) => {
    const payload = auth(req, res)
    const abonement = find(abonements, (user) => user.userId === payload.id)
    abonement ? res.status(200).json(abonement) : console.error('err')
})

app.get('/lessons/getinfo', (req, res) => {
    const payload = auth(req, res)
    const user = find(lessons, (user) => user.userId === payload.id)
    user ? res.status(200).json(user) : console.error('err')
})

app.get('/admin/getallusers', (req, res) => {
    const payload = auth(req, res)
    const user = find(users, (user) => user.id === payload.id)
    user.role === 'admin' ? res.status(200).json(usersInfo) : console.error('err')
})

app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
)