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
    }
}