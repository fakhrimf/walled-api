const pool = require("../db/db");

const addTransaction = async (transaction) => {
    try {
        const {date_epoch, fromto, description, amount, id_user, type} = transaction
        await pool.query('UPDATE users SET balance = balance + $1 WHERE id = $2', [amount, id_user], (error, results) => {
            if(error){
                throw error
            }
        })
        const res = await pool.query('INSERT INTO transaction (date_epoch, fromto, description, amount, id_user, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
            date_epoch, fromto, description, amount, id_user, type
        ]);
        return res.rows[0];
    } catch(error) {
        throw new Error(`DB Error Occurred: ${error}`)
    }
}

const updateTransaction = async (transaction) => {
    try {
        const {date_epoch, fromto, description, amount, id_user, type} = transaction
        await pool.query('UPDATE users SET balance = balance + $1 WHERE id = $2', [amount, fromto], (error, results) => {
            if(error){
                throw error
            }
        })
        await pool.query('UPDATE users SET balance = balance - $1 WHERE id = $2', [amount, id_user], (error, results) => {
            if(error){
                throw error
            }
        })
        const res = await pool.query('INSERT INTO transaction (date_epoch, fromto, description, amount, id_user, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
            date_epoch, fromto, description, amount, id_user, type
        ]);
        return res.rows[0];
    } catch(error) {
        throw new Error(`DB Error Occurred: ${error}`)
    }
}

const getTransaction = async (id) => {
    try {
        const res = await pool.query('SELECT * FROM transaction WHERE id_user = $1', [id]);
        return res.rows;
    } catch {
        throw new Error('DB Error Occurred',)
    }
}

module.exports = {addTransaction, updateTransaction, getTransaction}