const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    users = require('./data/users'),
    abonements = require('./data/abonements'),
    lessons = require('./data/lessons'),
    usersInfo = require('./data/usersInfo'),
    path = require('path')
const host = '127.0.0.1'
const port = process.env.PORT || 7000
const { json } = require('body-parser');
const cors = require('cors');

const tokenKey = '1a2b-3c4d-5e6f-7g8h'


app.use(express.json())
app.use(cors())
app.use(bodyParser.json())


function getInfo(req, res, arr) {
    if (req.headers.authorization) {
        jwt.verify(
            req.headers.authorization,
            tokenKey,
            (err, payload) => {
                if (err) {
                    console.error(err)
                }
                else if (payload) {
                    for (let user of arr) {
                        if (user.userId === payload.id) {
                            console.log(req.user);
                            return res.status(200).json(user)
                        }
                    }

                    if (!req.user) console.error('err')
                }
            }
        )
    }
    else
        return res
            .status(401)
            .json({ message: 'Not authorized' })
}

app.post('/api/auth', (req, res) => {
    for (let user of users) {
        if (
            req.body.login === user.login &&
            req.body.password === user.password
        ) {
            return res.status(200).json({
                id: user.id,
                role: user.role,
                token: jwt.sign({ id: user.id, role: user.role }, tokenKey),
            })
        }
    }

    return res.status(404).json({ message: 'Пользователь не найден' })
})

app.get('/user/getinfo', (req, res) => getInfo(req, res, usersInfo))

app.get('/abonemets/getinfo', (req, res) => getInfo(req, res, abonements))

app.get('/lessons/getinfo', (req, res) => getInfo(req, res, lessons))

app.get('/admin/getallusers', (req, res) => {
    if (req.headers.authorization) {
        jwt.verify(
            req.headers.authorization,
            tokenKey,
            (err, payload) => {
                if (err) {
                    console.error(err)
                }
                else if (payload) {
                    for (let user of users) {
                        if (user.id === payload.id && user.role === 'admin') {
                            return res.status(200).json(usersInfo)
                        }
                    }

                    if (!req.user) console.error('err')
                }
            }
        )
    }
    else
        return res
            .status(401)
            .json({ message: 'Not authorized' })
})

app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
)