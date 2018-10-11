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
    console.log('get interviews')
    res.end(); 
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
  app.get('/filter', (req, res) => {
    // dummy data
    const input = {
      company_name: 'google',
      type: 'algoritm',
      // difficulty: 2,
      // language: 'javascript'
    }

    const category = 'difficulty';
    const order = 'desc';

    const keys = Object.keys(input);

    let statement = 'SELECT * from company2, interview2 WHERE';
    // loop through the object's key and distinguish which key it is; company_name, type, difficulty, etc
    // add WHERE clause corresponding to the if statements, and add AND if there exists next element for additional statement
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].toString() === 'company_name') {
        statement += ` company2.name = \'${input[keys[i]]}\' AND company2.name = interview2.company_name`
        if (keys[i + 1]) statement += ' AND';
      }

      if (keys[i].toString() === 'type') {
        statement += ` interview2.type = \'${input[keys[i]]}\'`
        if (keys[i + 1]) statement += ' AND';
      }

      if (keys[i].toString() === 'difficulty') {
        statement += ` interview2.difficulty = ${input[keys[i]]}`
        if (keys[i + 1]) statement += ' AND';
      }
  
      if (keys[i].toString() === 'language') {
        statement += ` interview2.language = \'${input[keys[i]]}\'`
        if (keys[i + 1]) statement += ' AND';
      }
      // add cohort condition
      if (keys[i].toString() === 'cohort') {
        statement += ` interview2.cohort = ${input[keys[i]]}`
        if (keys[i + 1]) statement += ' AND';
      }
    }

    statement += ` ORDER BY ${category} ${order}`;

    db.query(statement, (err, result) => {
      if(err) console.error(err);
      
      console.log(result.rows);
    })
  })

}

