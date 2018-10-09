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
    db.query('SELECT * from table1', (err, result) => {
      console.log(result.rows)
    })
  })

  app.post('/addInterview', (req, res) => {
  })
}

