const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url, {});

connect.then(() => {
  console.log("Connected correctly to server.\n");
  const db = mongoose.connection;

  //Creating the dish
  Dishes.create({
    name: 'Uthappizza',
    description: 'test'
  })
  //updating the dish
  .then((dish) => {
    console.log(dish + '\n');
    return Dishes.findByIdAndUpdate(dish._id, {
      $set: {description: 'Updated Test'}
    }, {
      new: true
    }).exec();
  })
  //Adding comment to the same dish
  .then((dish) => {
    console.log(dish + '\n');

    dish.comments.push({
      rating: 5,
      comment: 'I\'m getting a sinking feeling',
      author: 'Leonardo di Carpaccia'
    });
    return dish.save(); // saving the comments
  })
  //deleting the collection 'dishes'
  .then((dish) => {
    console.log(dish + '\n');
    return db.collections['dishes'].drop();
  })
  .then(() => {
    return db.close();
  })
  .catch((err) => {
    console.log(err);
  });
});
