const joi = require("joi");
const service = require("../services/users.service");

const schema = joi.object({
    email: joi.string().email().required(),
    nickname: joi.string().required(),
    full_name: joi.string().required(),
    password: joi.string().required(),
    avatar: joi.string().required()
})

const createUser = async (req, res) => {
    const { err, value } = schema.validate(req.body)
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

module.exports = {createUser}