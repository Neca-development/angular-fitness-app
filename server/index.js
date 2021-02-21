const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    users = require('./data/users'),
    abonements = require('./data/abonements'),
    lessons = require('./data/lessons'),
    usersInfo = require('./data/usersInfo'),
    auth = require('./api/auth.service'),
    userRoutes = require('./routes/user.routes'),
    lessonsRoutes = require('./routes/lessons.routes'),
    abonementsRoutes = require('./routes/abonements.routes'),
    adminRoutes = require('./routes/admin.routes'),
    host = '127.0.0.1',
    port = process.env.PORT || 7000,
    { json } = require('body-parser'),
    cors = require('cors'),
    tokenKey = '1a2b-3c4d-5e6f-7g8h'


app.use(express.json())
app.use(cors())
app.use(bodyParser.json())


app.use('/user', userRoutes)
app.use('/lessons', lessonsRoutes)
app.use('/admin', adminRoutes)
app.use('/abonements', abonementsRoutes)


app.post('/api/login', (req, res) => {
    const user = users.find((user) => req.body.login === user.login && req.body.password === user.password)
    if (user)
        return res.status(200).json({
            data: {
                id: user.id,
                role: user.role,
                token: jwt.sign({ id: user.id, role: user.role }, tokenKey),
            }
        })
    else
        return res.status(404).json({ errorMessage: 'Пользователь не найден' })
})



app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
)