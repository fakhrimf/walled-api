const e = require("express")
const router = e.Router()

const cont = require("../controllers/users.controller")
const token = require("../middlewares/auth.middleware")

router.post("/users", cont.createUser)
router.post("/login", cont.loginUser)
router.get("/profile", token.authToken, cont.getUser)
router.post("/topup", token.authToken, cont.addTransaction)
router.post("/transfer", token.authToken, cont.updateTransaction)

module.exports = router