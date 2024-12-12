const repo = require("../repositories/users.repository")

const createUser = async (user) => {
    let res = await repo.getUserByEmail(user.email)
    if (res.length > 0) {
        throw new Error("User already exists")
    }
    return await repo.createUser(user)
}

const getUser = async (id) => {
    return await repo.getUser(id)
}

module.exports = {createUser, getUser}