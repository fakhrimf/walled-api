const e = require("express")
const router = e.Router()

const cont = require("../controllers/transactions.controller")
const token = require("../middlewares/transactions.middleware")

router.post("/transactions/topup", token.authTransaction, cont.addTransaction)
router.post("/transactions/transfer", token.authTransaction, cont.updateTransaction)
router.get("/transactions", token.authTransaction, cont.getTransaction)

module.exports = router