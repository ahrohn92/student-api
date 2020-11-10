const express = require('express')
const app = express()
const users = require('./users.json')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/users', (req, res) => res.send(users))

app.get('/users/:id', (req, res) => {
    /* GET a user by their id */
    res.send(users[req.params.id-1])
})

app.post('/', (req, res) => {
    /* POST user data using the request body */
    let {name, profilePic, lastCalled, timesCalled, notes} = req.body
    let result;
    if(name) {
        let newUserId = 1000
        users.push(req.body)
        result = {status: "Success", message: "The user was successfully added"}
    } else {
        result = {status: "Failed", message: "The user was not added"}
        res.status(400)
    }
    res.json(result)
})

app.get('/search', (req, res) => {
    /* GET a user by their name */
    let name = req.query.name
    let user = users.find(user => user.name[0] === name)
    res.send(user)
})

const port = 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))