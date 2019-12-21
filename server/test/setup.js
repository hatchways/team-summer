const db = require('../DbConnection');

before('Connect to database', (done) => {
  db.open().then(() => done()).catch(done);
});