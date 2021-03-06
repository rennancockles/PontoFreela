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
    
    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;
            
                const query = mysql.format('SELECT * FROM users WHERE email = ?;', [email])
                
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
    
    update: (user) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('UPDATE users SET name = ?, lastname = ?, email = ?, birth = ?, company = ? WHERE id = ?;', [
                    user.name,
                    user.lastname,
                    user.email,
                    user.birth,
                    user.company,
                    user.id
                ])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.affectedRows > 0)
                    } else {
                        reject(new Error("Error updating user!"))
                    }

                    connection.release();
                })
            })
        })
    },
    
    updatePassword: (passwordHash, userId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('UPDATE users SET password = ? WHERE id = ?;', [
                    passwordHash,
                    userId
                ])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.affectedRows > 0)
                    } else {
                        reject(new Error("Error updating password!"))
                    }

                    connection.release();
                })
            })
        })
    },
    
    create: (user) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('INSERT INTO users (name, lastname, email, birth, company, password) VALUES (?, ?, ?, ?, ?, ?);', [
                    user.name,
                    user.lastname,
                    user.email,
                    user.birth,
                    user.company,
                    user.password
                ])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.insertId)
                    } else {
                        reject(new Error("Error creating user!"))
                    }

                    connection.release();
                })
            })
        })
    }
}