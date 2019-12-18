const db = require('../DbConnection');

after('Disconnect database', (done) => {
  db.close().then(() => done()).catch(done);
});