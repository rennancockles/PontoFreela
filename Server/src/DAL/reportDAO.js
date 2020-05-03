import mysql from 'mysql'
import pool from './db'

export default {
    listByAccountId: (accountId, filter) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err

                let query = mysql.format('SELECT *, DATE_FORMAT(date, "%d/%m/%Y") dateFormatted FROM reports WHERE accountId = ?', [accountId])
                const queryWhere = (filter && filter.dateFrom && filter.dateTo) ? mysql.format('AND date BETWEEN ? AND ?', [filter.dateFrom, filter.dateTo]) : '' 
                query += ` ${queryWhere} ORDER BY date;`
                
                connection.query(query, (err, result) => {
                    if (err) throw err
                    
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new Error("Error getting reports of account!"))
                    }

                    connection.release()
                })
            })
        })
    },    

    listByClosingId: (accountId, closingId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err

                let query = mysql.format(`SELECT *, DATE_FORMAT(date, "%d/%m/%Y") dateFormatted 
                FROM reports 
                WHERE accountId = ? AND closingId = ?
                ORDER BY date;`, [accountId, closingId])
                
                connection.query(query, (err, result) => {
                    if (err) throw err
                    
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new Error("Error getting reports of account!"))
                    }

                    connection.release()
                })
            })
        })
    },

    findLastNDayByAccountId: (accountId, n) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;
            
                const query = mysql.format(`SELECT *, DATE_FORMAT(date, "%d/%m/%Y") dateFormatted FROM reports 
                    WHERE accountId = ? AND date = DATE(DATE_ADD(NOW(), INTERVAL -${n} DAY));`, [accountId])
                
                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result[0])
                    } else {
                        reject(new Error("Error getting report!"))
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
            
                const query = mysql.format('SELECT *, DATE_FORMAT(date, "%d/%m/%Y") dateFormatted FROM reports WHERE id = ?;', [id])
                
                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result[0])
                    } else {
                        reject(new Error("Error getting report!"))
                    }

                    connection.release();
                })
            })
        })
    },
    
    insert: (report, accountId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('INSERT INTO reports (date, obs, accountId) VALUES (?, ?, ?);', [
                    report.date,
                    report.obs,
                    accountId
                ])

                connection.query(query, (err, result) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            reject(new Error("Duplicated report date!"))
                        } else {
                            throw err
                        }
                    }

                    if (result) {
                        resolve(result.insertId)
                    } else {
                        reject(new Error("Error inserting report!"))
                    }

                    connection.release();
                })
            })
        })
    },
    
    update: (report, accountId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('UPDATE reports SET date = ?, obs = ? WHERE id = ? AND accountId = ?;', [
                    report.date,
                    report.obs,
                    report.id,
                    accountId
                ])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.affectedRows > 0)
                    } else {
                        reject(new Error("Error updating report!"))
                    }

                    connection.release();
                })
            })
        })
    },
    
    delete: (report, accountId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('DELETE FROM reports WHERE id = ? AND accountId = ?;', [
                    report.id,
                    accountId
                ])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.affectedRows > 0)
                    } else {
                        reject(new Error("Error deleting report!"))
                    }

                    connection.release();
                })
            })
        })
    },

    getReportData: (closingId, accountId, userId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err

                let query = mysql.format(`SELECT company, a.name, hourlyRate, 
                    DATE_FORMAT(fromDate, "%d/%m/%Y") fromDate, DATE_FORMAT(toDate, "%d/%m/%Y") toDate
                FROM users u
                INNER JOIN accounts a on u.id = a.userId
                INNER JOIN closings c on a.id = c.accountId
                WHERE u.id = ? AND a.id = ? AND c.id = ?;`, [userId, accountId, closingId])

                connection.query(query, (err, result) => {
                    if (err) throw err
                    
                    if (result) {
                        resolve(result[0])
                    } else {
                        reject(new Error("Error getting report data!"))
                    }

                    connection.release()
                })
            })
        })
    }
}