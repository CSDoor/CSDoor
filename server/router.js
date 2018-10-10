const db = require('./models/database.js')

module.exports = function(app){
  app.get('/getInterview', (req, res) => {
    db.query('SELECT * from table1', (err, result) => {
      console.log(result.rows)
    })
  })

  app.post('/addInterview', (req, res) => {
  })
}

