const e = require("express")
const router = e.Router()

const cont = require("../controllers/transactions.controller")
const token = require("../middlewares/auth.middleware")

router.post("/topup", token.authToken, cont.addTransaction)
router.post("/transfer", token.authToken, cont.updateTransaction)

module.exports = router