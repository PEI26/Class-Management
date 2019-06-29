const SQL = require('sql-template-strings')
const getDb = require('../db').getDb

export default {
  findById: async (class_id, next) => {
    try {
      const db = getDb()
      const classesid = await db.get(
        SQL`
        SELECT * FROM Student_classes
        WHERE id=${class_id}`
      )
      
      return classesid
    } catch (err) {
      next(err)
    }
  },
  
  findAll: async (req, next) => {
        try {
          const db = getDb()
          let sql = 'SELECT * FROM Student_classes '
          const classes = await db.all(sql)
         return classes
        } catch (err) {
          next(err)
        }
      },
      create: async (classes, next) => {
        try {
          let db = getDb()
          const newstudent = await db.run(SQL`INSERT INTO Student_classes (student_id) VALUES(${classes.student_id})`)
          const studentclasses_id = newstudent.lastID 
          
    
          return await studentclasses_id
        } catch (err) {
          // next(err)
          console.log(err)

        }
      },
      destroy: async (id, next) => {
        try {
          const db = getDb()
          const deleteStudents = await db.run(SQL`DELETE FROM Student_classes WHERE student_id=${id}`)
          return await deleteStudents
        } catch (err) {
          next(err)
        }
      }    
}