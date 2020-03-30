import mysql from 'mysql'
import pool from './db'

export default {    
    listByReportId: (reportId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;
            
                const query = mysql.format('SELECT *, TIME_FORMAT(time, "%H:%i") timeFormatted FROM records WHERE reportId = ? ORDER BY time;', [reportId])
                
                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result)
                    } else {
                        reject(new Error("Error getting records of report!"))
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
            
                const query = mysql.format('SELECT *, TIME_FORMAT(time, "%H:%i") timeFormatted FROM records WHERE id = ?;', [id])
                
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
    
    insert: (record, reportId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('INSERT INTO records (time, reportId) VALUES (?, ?);', [
                    record.time,
                    reportId
                ])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.insertId)
                    } else {
                        reject(new Error("Error inserting record!"))
                    }

                    connection.release();
                })
            })
        })
    },
    
    update: (record, reportId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('UPDATE records SET time = ? WHERE id = ? AND reportId = ?;', [
                    record.time,
                    reportId
                ])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.affectedRows > 0)
                    } else {
                        reject(new Error("Error updating record!"))
                    }

                    connection.release();
                })
            })
        })
    },
    
    delete: (record, reportId) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                const query = mysql.format('DELETE FROM records WHERE id = ? AND reportId = ?;', [
                    record.id,
                    reportId
                ])

                connection.query(query, (err, result) => {
                    if (err) throw err

                    if (result) {
                        resolve(result.affectedRows > 0)
                    } else {
                        reject(new Error("Error deleting record!"))
                    }

                    connection.release();
                })
            })
        })
    }
}