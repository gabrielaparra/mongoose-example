const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/snapcat');
// use snapcat (our database)
// for now, localhost is hardcoded

const Cat = mongoose.model(
  'Cat',                // 1st argument -> name of the model
  { name: String }      // 2nd argument -> schema object of the model
);

// mongoose will take the name of the model, turn into plural and use that
// name for the collection
// 'Cat' -> 'cats' -> db.cats.find()

// CRUD operations (mongoose version)

// C of CRUD (create)

const myKitty = new Cat({ name: 'Armani' });
myKitty.save((error) => {
  // this CALLBACK is called when the save is finished
  if (error) {
    console.log('Error!');
  } else {
    console.log('Save succesful');
  }
});
// db.cats.insertOne({ name: 'Armani' })
