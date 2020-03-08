import mysql from 'mysql'
import pool from './db'

export default {    
    listByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;
            
                const query = mysql.format('SELECT * FROM accounts WHERE userId = ?;', [userId])
                
                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result)
                    } else {
                        reject(new Error("Error getting accounts of user!"))
                    }

                    connection.release();
                })
            })
        })
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;
            
                const query = mysql.format('SELECT * FROM accounts WHERE id = ?;', [id])
                
                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result[0])
                    } else {
                        reject(new Error("Error getting account!"))
                    }

                    connection.release();
                })
            })
        })
    },
    
    update: (account, userId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('UPDATE accounts SET name = ?, hourlyRate = ? WHERE id = ? AND userId = ?;', [
                    account.name,
                    account.hourlyRate,
                    account.id,
                    userId
                ])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.affectedRows > 0)
                    } else {
                        reject(new Error("Error updating account!"))
                    }

                    connection.release();
                })
            })
        })
    },
    
    delete: (account, userId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('DELETE FROM accounts WHERE id = ? AND userId = ?;', [
                    account.id,
                    userId
                ])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.affectedRows > 0)
                    } else {
                        reject(new Error("Error deleting account!"))
                    }

                    connection.release();
                })
            })
        })
    },
    
    updateActive: (account, userId, activeValue) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('UPDATE accounts SET active = ? WHERE id = ? AND userId = ?;', [
                    activeValue,
                    account.id,
                    userId
                ])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.affectedRows > 0)
                    } else {
                        reject(new Error("Error updating account!"))
                    }

                    connection.release();
                })
            })
        })
    }
}