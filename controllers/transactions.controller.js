const joi = require("joi");
const service = require("../services/transactions.service");

const topupSchema = joi.object({
    description: joi.string().required(),
    amount: joi.number().required()
})

const transferSchema = joi.object({
    description: joi.string().required(),
    amount: joi.number().required(),
    fromto: joi.string().required()
})

const updateTransaction = async (req, res) => {
    const {err, value} = transferSchema.validate(req.body)
    if(err){
        return res.status(400).json({message: err.details[0].message})
    }
    try {
        await service.updateTransaction(value, req.user)
        return res.status(200).json({message: "Transfer success"})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const addTransaction = async (req, res) => {
    const {err, value} = topupSchema.validate(req.body)
    if(err){
        return res.status(400).json({message: err.details[0].message})
    }
    try {
        await service.addTransaction(value, req.user)
        return res.status(200).json({message: "Topup success"})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const getTransaction = async (req, res) => {
    try {
        const transaction = await service.getTransaction(Number(req.user.id))
        return res.status(200).json(transaction)
    } catch(error) {
        return res.status(404).json({message: "Not found"})
    }
}

module.exports = {addTransaction, updateTransaction, getTransaction}