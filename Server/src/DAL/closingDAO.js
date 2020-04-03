import mysql from 'mysql'
import pool from './db'

export default {    
    create: (closingInput) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('INSERT INTO closings (fromDate, toDate, accountId) VALUES (?, ?, ?);', [
                    closingInput.dateFrom,
                    closingInput.dateTo,
                    closingInput.accountId
                ])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.insertId)
                    } else {
                        reject(new Error("Error inserting closing!"))
                    }

                    connection.release();
                })
            })
        })
    },
       
    apply: (closingInput, closingId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format(`UPDATE reports SET closingId = ? 
                WHERE closingId IS NULL AND accountId = ? AND date BETWEEN ? AND ?;`, [
                    closingId,
                    closingInput.accountId,
                    closingInput.dateFrom,
                    closingInput.dateTo
                ])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.affectedRows > 0)
                    } else {
                        reject(new Error("Error applying closings!"))
                    }

                    connection.release();
                })
            })
        })
    }
}