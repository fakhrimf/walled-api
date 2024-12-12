const repo = require("../repositories/transactions.repository")
const userRepo = require("../repositories/users.repository")

const addTransaction = async (transaction, user) => {
    if (!transaction.date_epoch) {
        transaction.date_epoch = Date.now()
    }
    const userData = await userRepo.getUser(user.id)
    if (!userData) {
        throw new Error("User not found")
    }
    transaction.id_user = user.id
    transaction.fromto = user.id
    transaction.type = "CREDIT"
    return await repo.addTransaction(transaction)
}

const updateTransaction = async (transaction, user) => {
    if (!transaction.date_epoch) {
        transaction.date_epoch = Date.now()
    }
    const transferTarget = await userRepo.getUser(transaction.fromto)
    if (!transferTarget) {
        throw new Error("Transfer target not found")
    }
    const userData = await userRepo.getUser(user.id)
    if (!userData) {
        throw new Error("User not found")
    }
    if (userData.balance < transaction.amount) {
        throw new Error("Insufficient balance")
    }
    transaction.id_user = user.id
    transaction.type = "DEBIT"
    return await repo.updateTransaction(transaction)
}

const getTransaction = async (id) => {
    const transaction = await repo.getTransaction(id)
    if(!transaction) {
        throw new Error("Transaction not found")
    } else {
        return transaction
    }
}


module.exports = {addTransaction, updateTransaction, getTransaction}