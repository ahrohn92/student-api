const express = require('express')
const app = express()
const students = require('./students.json')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/students', (req, res) =>  {
    res.send(students)
})

app.get('/search', (req, res) => {
    if (req.query) {
        let name = req.query.name
        res.send(students.find(student => name === student.name[0]))
    } else {
        res.send(students)
    }
})

app.get('/students/:studentId', (req, res) => {
    let id = parseInt(req.params.studentId)
    let student = students.find(student => student.id === id)
    res.send(student)
})

app.get('/grades/:studentId', (req, res) => {
    let id = parseInt(req.params.studentId)
    let student = students.find(student => student.id === id)
    let grades = student.grades
    res.send(grades)
})

app.post('/grades', (req, res) => {
    let {id, name, grade} = req.body
    let result;
    if (id && grade) {
        result = {status: "Success", message: "The grade was successfully recorded"}
    } else {
        result = {status: "Failed", message: "The grade was not recorded"}
    }
    res.send(result)
})

app.post('/register', (req, res) => {
    let {username, email} = req.body
    let result;
    if (username && email) {
        result = {status: "Success", message: "The user was successfully registered"}
    } else {
        result = {status: "Failed", message: "The user was not registered"}
    }
    res.send(result)
})

const port = 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))