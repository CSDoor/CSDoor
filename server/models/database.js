const pg = require('pg');

const uri = 'postgres://kojnibzt:0HCAeU1on-jx9TWL-wQBcipXvrqywxn2@pellefant.db.elephantsql.com:5432/kojnibzt';
var client = new pg.Client(uri);

client.connect((err, db) => {
  if (err) {
    return console.log('could not connect to postgres', err)
  }
});

module.exports = client;
