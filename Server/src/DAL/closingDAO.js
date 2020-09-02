import mysql from 'mysql'
import pool from './db'

export default {     
    list: (accountId, userId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err

                let query = mysql.format(`SELECT c.*, 
                DATE_FORMAT(fromDate, "%d/%m/%Y") fromDateFormatted, 
                DATE_FORMAT(toDate, "%d/%m/%Y") toDateFormatted,
                DATE_FORMAT(createdAt, "%d/%m/%Y") createdAtFormatted,  
                DATE_FORMAT(paymentDate, "%d/%m/%Y") paymentDateFormatted  
                FROM closings c
                INNER JOIN accounts a ON a.id = c.accountId
                WHERE userId = ? AND accountId = ?
                ORDER BY fromDate;`, [userId, accountId])
                
                connection.query(query, (err, result) => {
                    if (err) throw err
                    
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new Error("Error listing closings!"))
                    }

                    connection.release()
                })
            })
        })
    },

    create: (closingInput) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format(`INSERT INTO closings (fromDate, toDate, accountId, totalMs, totalTime, totalValue) 
                VALUES (?, ?, ?, ?, ?, ?);`, [
                    closingInput.dateFrom,
                    closingInput.dateTo,
                    closingInput.accountId,
                    closingInput.totalMs,
                    closingInput.totalTime,
                    closingInput.totalValue
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
    },
       
    unapply: (closingId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('UPDATE reports SET closingId = NULL WHERE closingId = ?;', [closingId])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.affectedRows > 0)
                    } else {
                        reject(new Error("Error unapplying closings!"))
                    }

                    connection.release();
                })
            })
        })
    },
    
    delete: (closingId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('DELETE FROM closings WHERE id = ?;', [closingId])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.affectedRows > 0)
                    } else {
                        reject(new Error("Error deleting closing!"))
                    }

                    connection.release();
                })
            })
        })
    },
       
    changePaidStatus: (closingId, accountId, paidStatus) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const paymentDate = paidStatus ? new Date() : null 

                const query = mysql.format('UPDATE closings SET isPaid = ?, paymentDate = ? WHERE id = ? AND accountId = ?;', 
                    [paidStatus, paymentDate, closingId, accountId])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.affectedRows > 0)
                    } else {
                        reject(new Error("Error updating closing paid status!"))
                    }

                    connection.release();
                })
            })
        })
    }
}