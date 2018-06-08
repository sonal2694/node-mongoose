const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url, {});

connect.then(() => {
  console.log("Connected correctly to server.\n");
  const db = mongoose.connection;
  var newDish = Dishes({
    name: 'Uthappizza',
    description: 'test'
  });

  newDish.save()
    .then((dish) => {
      console.log(dish);
      return Dishes.find({}).exec();
    })
    .then((dishes) => {
      console.log(dishes);
      return db.collections['dishes'].drop();
    })
    .then(() => {
      return db.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
