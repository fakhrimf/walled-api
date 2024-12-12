const joi = require("joi");
const service = require("../services/users.service");

const registerSchema = joi.object({
    email: joi.string().email().required(),
    nickname: joi.string().required(),
    full_name: joi.string().required(),
    password: joi.string().required(),
    avatar: joi.string().required()
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

const getUser = async (req, res) => {
    try {
        const user = await service.getUser(Number(req.user.id))
        return res.status(200).json({id: user.id, nickname: user.nickname, avatar: user.avatar, balance: user.balance, full_name: user.full_name, email: user.email})
    } catch(error) {
        return res.status(404).json({message: "Not found"})
    }
}

const loginUser = async (req, res) => {
    try {
        const {err, value} = loginSchema.validate(req.body)
        if (err) {
            return res.status(400).json({message: err.details[0].message})
        }
        const login = await service.login(value)
        return res.status(200).json({token: login})
    } catch {
        return res.status(400).json({message: "Wrong password or email"})
    }
}

const createUser = async (req, res) => {
    const { err, value } = registerSchema.validate(req.body)
    if (err) {
        return res.status(400).json({message: err.details[0].message})
    }
    try {
        const user = await service.createUser(value)
        return res.status(201).json({id: user.id})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports = {createUser, loginUser, getUser}