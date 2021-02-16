const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    users = require('./data/users'),
    abonements = require('./data/abonements'),
    usersInfo = require('./data/usersInfo'),
    path = require('path')
const host = '127.0.0.1'
const port = process.env.PORT || 7000
const cors = require('cors');

const tokenKey = '1a2b-3c4d-5e6f-7g8h'


app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
// app.use((req, res, next) => {
//     if (req.headers.authorization) {
//         jwt.verify(
//             // req.headers.authorization.split(' ')[1],
//             req.headers.authorization,
//             tokenKey,
//             (err, payload) => {
//                 if (err) {
//                     next()
//                 }
//                 else if (payload) {
//                     console.log(payload);
//                     for (let user of users) {
//                         if (user.id === payload.id) {
//                             req.user = user
//                             next()
//                         }
//                     }

//                     if (!req.user) next()
//                 }
//             }
//         )
//     }

//     next()
// })

app.post('/api/auth', (req, res) => {
    for (let user of users) {
        if (
            req.body.login === user.login &&
            req.body.password === user.password
        ) {
            return res.status(200).json({
                id: user.id,
                login: user.login,
                token: jwt.sign({ id: user.id }, tokenKey),
            })
        }
    }

    return res.status(404).json({ message: 'Пользователь не найден' })
})

app.get('/user/getinfo', (req, res) => {
    if (req.headers.authorization) {
        jwt.verify(
            req.headers.authorization,
            tokenKey,
            (err, payload) => {
                if (err) {
                    console.error(err)
                }
                else if (payload) {
                    for (let user of usersInfo) {
                        if (user.userId === payload.id) {
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
})

app.get('/abonemets/getinfo', (req, res) => {
    if (req.headers.authorization) {
        jwt.verify(
            req.headers.authorization,
            tokenKey,
            (err, payload) => {
                if (err) {
                    console.error(err)
                }
                else if (payload) {
                    for (let user of abonements) {
                        if (user.userId === payload.id) {
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
})

app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
)