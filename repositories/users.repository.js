const pool = require("../db/db");

const createUser = async (user) => {
    const {email, nickname, full_name, password, avatar} = user
    try {
        const res = await pool.query('INSERT INTO users (email, nickname, full_name, password, balance, avatar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
            email, nickname, full_name, password, 0, avatar
        ]);
        return res.rows[0];
    } catch {
        throw new Error("DB Error Occurred")
    }
}

const getUserByEmail = async (email) => {
    try {
        const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return res.rows;
    } catch {
        throw new Error("DB Error Occurred")
    }
}

const getUser = async (id) => {
    try {
        const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.rows[0];
    } catch {
        throw new Error("DB Error Occurred")
    }
}

module.exports = {createUser, getUser, getUserByEmail}
