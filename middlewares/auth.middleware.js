const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({message: "Unauthorized"})
    else jwt.verify(token, process.env.TOKEN, (err, user) => {
        if (err) return res.status(403).json({message: "Forbidden"})
        req.user = user
        next()
    })
}

module.exports = {authToken}