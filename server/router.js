const db = require('./models/database.js')

module.exports = function(app){
  app.get('/getInterview', (req, res) => {
    db.query('SELECT * from interview2', (err, result) => {
      if (err) return res.status(500).json({ error: '1 Internal Server Error'});
      console.log('inside query', result.rows)
      res.json(result.rows);
    })
  })

  app.post('/addInterview', (req, res) => {
  })

  // filter function with get request
  app.get('/filter', (req, res) => {
    // dummy data
    // const input = {
    //   company_name: 'google',
    //   type: 'algoritm',

    // }

    console.log('req here', req.body);


    let sort = '';
    let order = '';

    const input = req.body;
    const keys = Object.keys(input);

    let statement = 'SELECT * from "Company", "Interviewquestion" WHERE';
    // loop through the object's key and distinguish which key it is; company_name, type, difficulty, etc
    // add WHERE clause corresponding to the if statements, and add AND if there exists next element for additional statement
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].toString() === 'company_name') {
        statement += ` "Company".name = \'${input[keys[i]]}\' AND "Company".id = "Interviewquestion".id`
        if (keys[i + 1]) statement += ' AND';
      }

      if (keys[i].toString() === 'type') {
        statement += ` "Interviewquestion".type = \'${input[keys[i]]}\'`
        if (keys[i + 1]) statement += ' AND';
      }

      if (keys[i].toString() === 'difficulty') {
        statement += ` "Interviewqestion".difficulty >= ${input[keys[i]].min} AND "Interviewquestion".difficulty <= ${input[keys].max}`
        if (keys[i + 1]) statement += ' AND';
      }
  
      if (keys[i].toString() === 'language') {
        statement += ` "Interviewquestion".language = \'${input[keys[i]]}\'`
        if (keys[i + 1]) statement += ' AND';
      }
      // add cohort condition
      if (keys[i].toString() === 'cohort') {
        statement += ` "Interviewquestion".cohort = ${input[keys[i]]}`
        if (keys[i + 1]) statement += ' AND';
      }

      if(keys[i].toString() === 'sort') {
        sort = input[keys[i]];
      }

      if(keys[i].toString() === 'order') {
        order = input[keys[i]];
      }
    }
    
    if (input[sort] && input[order]) {
      statement += ` ORDER BY ${input[sort]} ${input[order]}`;
    }


    db.query(statement, (err, result) => {
      if(err) console.error(err);
      console.log(result.rows);
      res.send(JSON.stringify(result))
    })
  })

}

