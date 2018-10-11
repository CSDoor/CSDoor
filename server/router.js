const db = require('./models/database.js')

module.exports = function(app){
  app.get('/getCompanies', (req, res) => {
    const query = `SELECT name FROM "Company"`
    db.query(query)
      .then(companyNames => {
        res.json(companyNames.rows);
      })
  })

  app.get('/getInterview', (req, res) => {
    db.query('SELECT * from "Interviewquestion"', (err, result) => {
      if (err) return res.status(500).json({ error: '1 Internal Server Error'});
      // console.log('inside query', result.rows)
      res.json(result.rows);
    })
  })

  app.post('/addInterview', (req, res) => {
    const dateStamp = Date.now(); 
    let companyId = -1; 
    let addedCompany = ''; 

    async function postCompany() {
      // Promise so company Id is found before adding an interview
      findCompanyId = new Promise(resolve => {
        db.query(`SELECT id FROM "Company" WHERE name = '${req.body.company}'`)
          .then(result => {

          // company does not exist, create company and return the id. 
          if (result.rows.length < 1) {
            const addCompany = `INSERT INTO "Company" (name) VALUES ('${req.body.company}') RETURNING id;`;
            addedCompany = req.body.company; 
            db.query(addCompany)
              .then(result => {
                resolve(result.rows[0].id)
              })
              .catch(err => console.log('this is error', err)) 
          }

          // company already exists, return the company id
          else {
            resolve(result.rows[0].id)
          }
        })
      })
      // wait for companyId to resolve before proceeding.
      companyId = await findCompanyId;
      console.log('added company', addedCompany);

      // define query to add an interview
      let insertStatement = `INSERT INTO "Interviewquestion" ("companyId", type, question, difficulty, "createdBy", date, language)`;
      insertStatement += `VALUES ('${companyId}', '${req.body.type}', '${req.body.question}', '${req.body.difficulty}', '${req.body.createdBy}', '${dateStamp}', '${req.body.language}')`
      insertStatement += `RETURNING "companyId", type, question, difficulty, "createdBy", date, language`
      
      // add interview to database
      db.query(insertStatement)
        .then(result => res.json(addedCompany))
        .catch(err => console.log('this is err: ', err)) 
    }
    postCompany();
  })

  

  // filter function with get request
  app.post('/filter', (req, res) => {
    // dummy data
    console.log('req here', req.body);

    let sort;
    let order;

    const input = req.body;
    const keys = Object.keys(input);

    let statement = 'SELECT * from "Company", "Interviewquestion" WHERE';
    // loop through the object's key and distinguish which key it is; company_name, type, difficulty, etc
    // add WHERE clause corresponding to the if statements, and add AND if there exists next element for additional statement
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].toString() === 'company') {
        statement += ` "Company".name = \'${input[keys[i]]}\' AND "Company".id = "Interviewquestion"."companyId"`
        if (keys[i + 1] && (keys[i + 1].toString() !== 'sort' && keys[i + 1].toString() !== 'order')) statement += ' AND';
      }

      if (keys[i].toString() === 'type') {
        statement += ` "Interviewquestion".type = \'${input[keys[i]]}\'`
        if (keys[i + 1] && (keys[i + 1].toString() !== 'sort' && keys[i + 1].toString() !== 'order')) statement += ' AND';
      }

      if (keys[i].toString() === 'difficulty') {
        statement += ` "Interviewquestion".difficulty >= ${input[keys[i]].min} AND "Interviewquestion".difficulty <= ${input[keys[i]].max}`
        if (keys[i + 1] && (keys[i + 1].toString() !== 'sort' && keys[i + 1].toString() !== 'order')) statement += ' AND';
      }
  
      if (keys[i].toString() === 'language') {
        statement += ` "Interviewquestion".language = \'${input[keys[i]]}\'`
        if (keys[i + 1] && (keys[i + 1].toString() !== 'sort' && keys[i + 1].toString() !== 'order')) statement += ' AND';
      }
      // add cohort condition
      if (keys[i].toString() === 'cohort') {
        statement += ` "Interviewquestion".cohort = ${input[keys[i]]}`
        if (keys[i + 1] && (keys[i + 1].toString() !== 'sort' && keys[i + 1].toString() !== 'order')) statement += ' AND';
      }

      if (keys[i].toString() === 'sort') {
        sort = input[keys[i]].toString();
      }

      if (keys[i].toString() === 'order') {
        order = input[keys[i]].toString();
      }
    }
    
    if (sort && order) statement += ` ORDER BY ${sort} ${order}`;

    db.query(statement)
      .then(response => {
        console.log('response here', response.rows)
        return res.json(response.rows);
      })
      .catch(err => res.status(500).send(err))
  })

}

