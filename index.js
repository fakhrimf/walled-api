const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const router = require("./routers/users.router")
app.use(router)
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})

// const createUser = (request, response) => {
//     const {email, nickname, full_name, password, avatar} = request.body
//     const schema = joi.object({email: joi.string().email().required(),
//         nickname: joi.string().required(),
//         full_name: joi.string().required(),
//         password: joi.string().required(),
//         avatar: joi.string().required()
//     }).validate(request.body)
//     if(schema.error){
//         response.status(400).json({message: schema.error.details[0].message})
//     } else {
//         pool.query('INSERT INTO users (email, nickname, full_name, password, balance, avatar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
//             email, nickname, full_name, password, 0, avatar
//         ], (error, results) => {
//                 if (error) {
//                     throw error;
//                 }
//                 console.log(results.rows[0])
//                 response.status(201).json({
//                     id: results.rows[0].id
//                 })
//             }
//         )
//     }
// }

// const login = (request, response) => {
//     const {email, password} = request.body
//     const schema = joi.object({email: joi.string().email().required(), password: joi.string().required()}).validate(request.body)
//     if(schema.error){
//         response.status(400).json({message: schema.error.details[0].message})
//     } else {
//         pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
//             if(error){
//                 throw error
//             }
//             if(results.rows.length === 0){
//                 response.status(404).json({message: "Incorrect password or email"})
//             } else {
//                 if(results.rows[0].password === password){
//                     response.status(200).json({message: "Login success", data: {id: results.rows[0].id, nickname: results.rows[0].nickname, avatar: results.rows[0].avatar, balance: results.rows[0].balance, full_name: results.rows[0].full_name, email: results.rows[0].email}})
//                 } else {
//                     response.status(404).json({message: "Incorrect password or email"})
//                 }
//             }
//         })
//     }
// }

// const getUser = (request, response) => {
//     const {id} = request.params
//     pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//         if(error){
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// }

// const transfer = (request, response) => {
//     const {from_id, to_id, amount} = request.body
//     const schema = joi.object({from_id: joi.number().required(), to_id: joi.number().required(), amount: joi.number().required()}).validate(request.body)
//     if(schema.error) {
//         response.status(400).json({message: schema.error.details[0].message})
//     } else {
//         pool.query('UPDATE users SET balance = balance + $1 WHERE id = $2', [amount, to_id], (error, results) => {
//             if(error){
//                 throw error
//             }
//             pool.query('UPDATE users SET balance = balance - $1 WHERE id = $2', [amount, from_id], (error, results) => {
//                 if(error){
//                     throw error
//                 }
//                 response.status(200).json({message: "Transfer success"})
//             })
//         })
//     }
// }

// const topup = (request, response) => {
//     const {id, amount} = request.body
//     const schema = joi.object({id: joi.number().required(), amount: joi.number().required()}).validate(request.body)
//     if (schema.error) {
//         response.status(400).json({message: schema.error.details[0].message})
//     } else {
//         pool.query('UPDATE users SET balance = balance + $1 WHERE id = $2', [amount, id], (error, results) => {
//             if(error){
//                 throw error
//             }
//             response.status(200).json({message: "Topup success"})
//         })
//     }
// }

// app.get("/users/:id", getUser)
// app.post("/transfer", transfer)
// app.post("/topup", topup)
// app.post("/login", login)
// app.post("/users", createUser)

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// })