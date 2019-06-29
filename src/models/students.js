const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
    findById: async (id, next) => {
        try {
          const db = getDb()
          const studentsid = await db.get(
            SQL`
            SELECT * FROM Students
            WHERE id=${id}`
          )
          
          return studentsid
        } catch (err) {
          next(err)
        }
      },
      findAll: async (req, next) => {
        try {
          const db = getDb()
          let sql = 'SELECT * FROM Students '
          const students = await db.all(sql)
         return students
        } catch (err) {
          next(err)
        }
      },
      create: async (students, next) => {
        try {
          let db = getDb()
          const newstudent = await db.run(SQL`INSERT INTO Students(firstname,lastname) VALUES(${students.firstname}, ${students.lastname})`)
          const student_id = newstudent.lastID 
         
          //const created = await db.get(SQL`SELECT * FROM Students WHERE id=${student_id}`)
    
          return await student_id      
        } catch (err) {
          console.log(err)
          // next(err)
        }
      },
      update: async (id, studentsParams, next) => {
        try {
          const db = getDb()
          let columns = Object.keys(studentsParams)
          let columnsql = columns.join(',')
          let cvalues = columns.map(col => {
            return studentsParams[col]
          })
          let values = columns
            .map(() => {
              return '?'
            })
            .join(',')
          let sql = `UPDATE Students SET (${columnsql}) = (${values}) WHERE id='${id}'`
          const updatedstmt = await db.prepare(sql)
          const updateQuery = await updatedstmt.run(cvalues)
          return updateQuery
        } catch (err) {
          next(err)
        }
      },    
      destroy: async (id, next) => {
        try {
          const db = getDb()
          const deleteStudents = await db.run(SQL`DELETE FROM Students WHERE id=${id}`)
          return await deleteStudents
        } catch (err) {
          next(err)
        }
      }      
  }