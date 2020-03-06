import mysql from 'mysql'
import pool from './db'

export default {
    list: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err
                
                connection.query('SELECT * FROM users;', (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result)
                    } else {
                        reject(new Error("Error listing users!"))
                    }

                    connection.release();
                })
            })
        })
    },
    
    findById: (userId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;
            
                const query = mysql.format('SELECT * FROM users WHERE id = ?;', [userId])
                
                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result[0])
                    } else {
                        reject(new Error("Error getting user!"))
                    }

                    connection.release();
                })
            })
        })
    },
    
    findByLogin: (email, password) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;
            
                const query = mysql.format('SELECT * FROM users WHERE email = ? AND password = ?;', [email, password])
                
                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result[0])
                    } else {
                        reject(new Error("Error getting user!"))
                    }

                    connection.release();
                })
            })
        })
    }
}