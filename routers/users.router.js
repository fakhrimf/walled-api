const e = require("express")
const router = e.Router()

const cont = require("../controllers/users.controller")

router.post("/users", cont.createUser)
router.post("/login", cont.loginUser)

module.exports = router