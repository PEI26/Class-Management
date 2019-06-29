const SQL = require('sql-template-strings')
const getDb = require('../db').getDb


export default {
    findById: async (id, next) => {
        try {
          const db = getDb()
          const classesid = await db.get(
            SQL`
            SELECT * FROM Classes
            WHERE id=${id}`
          )
          
          return classesid
        } catch (err) {
          next(err)
        }
      },
      findAll: async (req, next) => {
        try {
          const db = getDb()
          let sql = 'SELECT * FROM Classes '
          const classes = await db.all(sql)
         return classes
        } catch (err) {
          next(err)
        }
      },
      create: async (classes, next) => {
        try {
          let db = getDb()
          const newclasses = await db.run(SQL`INSERT INTO Classes (code, name ,startdate, enddate, teacher_id) VALUES(${classes.code}, ${classes.name}, ${classes.startdate},${classes.enddate},${classes.teacher_id})`)
          const classes_id = newclasses.lastID 
          
    
          return await classes_id
        } catch (err) {
          // next(err)
          console.log(err)

        }
      },
      update: async (id, classesParams, next) => {
        try {
          const db = getDb()
          let columns = Object.keys(classesParams)
          let columnsql = columns.join(',')
          let cvalues = columns.map(col => {
            return classesParams[col]
          })
          let values = columns
            .map(() => {
              return '?'
            })
            .join(',')
          let sql = `UPDATE Classes SET (${columnsql}) = (${values}) WHERE id='${id}'`
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
          const deleteClasses = await db.run(SQL`DELETE FROM Classes WHERE id=${id}`)
          return await deleteClasses
        } catch (err) {
          next(err)
        }
      }    

   
    
    
}

    