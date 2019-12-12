const mongoose = require('mongoose');

const { MONGO_URI, MONGO_TEST_URI } = process.env;

const dbConnect = (URI, resolve, reject) => {
  return mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('DB Connected');
      resolve();
    })
    .catch((err) => reject(err));
};

const open = () => new Promise((resolve, reject) => {
  if (process.env.hasOwnProperty('NODE_ENV') && process.env.NODE_ENV === 'test') {
    const Mockgoose = require('mockgoose').Mockgoose;
    const mockgoose = new Mockgoose(mongoose);

    mockgoose.prepareStorage().then(() => {
      dbConnect(MONGO_TEST_URI, resolve, reject)
    }).catch((err) => reject(err))
  } else {
    dbConnect(MONGO_URI, resolve, reject)
  }
});

const close = () => mongoose.disconnect();

module.exports = {open, close};