const e = require("express")
const router = e.Router()

const cont = require("../controllers/users.controller")

router.post("/users", cont.createUser)

module.exports = router