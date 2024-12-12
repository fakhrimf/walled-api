const repo = require("../repositories/users.repository")
const bcrypt = require("bcrypt")
const { genToken } = require("../utils/auth.util")

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
        throw new Error('Email or password is incorrect')
    }

    const isValid = await bcrypt.compare(user.password, res[0].password)
    if (!isValid) {
        throw new Error('Email or password is incorrect')
    }

    token = genToken({email: res[0].email, id: res[0].id})
    return token
}

const getUser = async (id) => {
    const user = await repo.getUser(id)
    if(!user) {
        throw new Error("User not found")
    } else {
        return user
    }
}

module.exports = {createUser, getUser, login}