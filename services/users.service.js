const repo = require("../repositories/users.repository")
const bcrypt = require("bcrypt")

const createUser = async (user) => {
    let res = await repo.getUserByEmail(user.email)
    if (res.length > 0) {
        throw new Error("User already exists")
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword
    return await repo.createUser(user)
}

const login = async (user) => {
    let res = await repo.getUserByEmail(user.email)
    if (res.length === 0) {
        throw new Error("User doesn't exists")
    }

    const isValid = await bcrypt.compare(user.password, res[0].password)
    if (!isValid) {
        throw new Error("Incorrect password")
    }
    return res[0]
}

const getUser = async (id) => {
    return await repo.getUser(id)
}

module.exports = {createUser, getUser, login}