const pool = require('../db/db');

(async () => {
  try {
    // await db.schema.dropTableIfExists('users3')
    await pool.schema.withSchema('public').createTable('users', (table) => {
      table.increments()
      table.string('username')
      table.string('password')
    })
    console.log('Created users table!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
