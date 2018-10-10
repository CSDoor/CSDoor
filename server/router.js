const db = require('./models/database.js')

const buildScript = `
CREATE TABLE "User" (
  "id"  serial  UNIQUE,
  "name"  varchar  NOT NULL  UNIQUE,
  "cohort"  integer  NOT NULL,
  "company"  varchar  NOT NULL,
  "jobTitle"  varchar  NOT NULL,
  CONSTRAINT User_pk PRIMARY KEY ("id")
) WITH (
OIDS=FALSE
);

CREATE TABLE "Interviewquestion" (
  "id"  serial  UNIQUE,
  "company"  varchar  NOT NULL,
  "type"  varchar  NOT NULL,
  "question"  varchar  NOT NULL  UNIQUE,
  "difficulty"  integer  NOT NULL,
  "createdBy"  varchar,
  "date"  varchar  NOT NULL,
  "language"  varchar  NOT NULL,
  CONSTRAINT Interviewquestion_pk PRIMARY KEY ("id")
) WITH (
OIDS=FALSE
);

CREATE TABLE "Comments" (
  "id"  serial  UNIQUE,
  "difficulty"  integer  NOT NULL,
  "user"  varchar  NOT NULL,
  "text"  varchar  NOT NULL,
  "question"  varchar,
  CONSTRAINT Comments_pk PRIMARY KEY ("id")
) WITH (
OIDS=FALSE
);

CREATE TABLE "Company" (
  "id"  serial  UNIQUE,
  "name"  varchar,
  CONSTRAINT Company_pk PRIMARY KEY ("id")
) WITH (
OIDS=FALSE
);
`

module.exports = function(app){
  app.get('/getInterview', (req, res) => {
    db.query('SELECT * from interview2', (err, result) => {
      if (err) return res.status(500).json({ error: '1 Internal Server Error'});
      console.log('inside query', result.rows)
      res.status(200).send(result.rows);
    })
  })

  app.post('/addInterview', (req, res) => {
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

