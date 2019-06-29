const SQL = require('sql-template-strings')
const getDb = require('../db').getDb


export default {
    findById: async (id, next) => {
        try {
          const db = getDb()
          const teachersid = await db.get(
            SQL`
            SELECT * FROM Teachers
            WHERE id=${id}`
          )
          
          return teachersid
        } catch (err) {
          next(err)
        }
      },
      findAll: async (req, next) => {
        try {
          const db = getDb()
          let sql = 'SELECT * FROM Teachers  '
          const teachers = await db.all(sql)
         return teachers
        } catch (err) {
          next(err)
        }
      },
      create: async (teachers,  next) => {
        try {
          let db = getDb()
          const newteacher = await db.run(SQL`INSERT INTO Teachers (firstname, lastname) VALUES(${teachers.firstname}, ${teachers.lastname})`)
          const teacher_id =  newteacher.lastID
          
          // const created = await db.get(SQL`SELECT * FROM Teachers WHERE id=${teacher_id}`)
    
          return await teacher_id
        } catch (err) {
          // next(err)
          console.log(err)
        }
      },
      update: async (id, teachersParams, next) => {
        try {
          const db = getDb()
          let columns = Object.keys(teachersParams)
          let columnsql = columns.join(',')
          let cvalues = columns.map(col => {
            return teachersParams[col]
          })
          let values = columns
            .map(()=> {
              return '?'
            })
            .join(',')
          let sql = `UPDATE Teachers SET (${columnsql}) = (${values}) WHERE id='${id}'`
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
          const deleteTeachers = await db.run(SQL`DELETE FROM Teachers WHERE id=${id}`)
          return await deleteTeachers
        } catch (err) {
          next(err)
        }
      }    

   
    
  }