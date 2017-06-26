const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/snapcat');
// use snapcat (our database)
// for now, localhost is hardcoded

const Schema = mongoose.Schema;

const catSchema = new Schema ({
  name: { type: String, required: true },
  // the name of the cat is always required
  breed: { type: String },
  age: { type: Number, default: 0 }
  // defaults the value of age to 0
});

const Cat = mongoose.model(
  'Cat',                // 1st argument -> name of the model
  catSchema             // 2nd argument -> schema of the model
);

// mongoose will take the name of the model, turn into plural and use that
// name for the collection
// 'Cat' -> 'cats' -> db.cats.find()

// CRUD operations (mongoose version)

// C of CRUD (create)

const myKitty = new Cat(
  {
    name: 'Armani',
    breed: 'Tuxed Cat',
    age: 14,
    //this field is ignored because it's not part of the scheema
    favoriteToy: 'Water Glass'
  });

  myKitty.save((error) => {
  // this CALLBACK is called when the save is finished
    if (error) {
      console.log('Error!');
    } else {
      console.log('Save succesful');
  }
});
// db.cats.insertOne({ name: 'Armani' })

// we can also use this as an insertMany
Cat.create(
  {
    name: 'Nala',
    breed: 'Part Lion',
    age: 1
  },
  (error) => {
  if (error) {
    console.log('Sorry, that didn\'t work');
  } else  {
    console.log('Saved!');
  }
});

// R of CRUD (read or retrieve)

Cat.find((error, catResults) => {
  if (error) {
    console.log('Error found.');
  } else {
    console.log('All the cats!');
    catResults.forEach((cat) => {
      console.log('--> cat: ' + cat.name);
    });
  }
});
// db.cats.find();

Cat.find(
  { name: 'Nala' },                //1st arg -> criteria object
  { name: 1, _id: 0 },             //2nd arg -> projection object

  (error, nalaResults) => {        //3rd arg -> callback that runs when is finished
    if (error) {
      console.log('Nala found error');
    } else {
      console.log('All the Nalas!');
      nalaResults.forEach((nala) => {
        console.log('cat: ' + nala);
      });
    }
  }
);


// Cat.findById()             R of CRUD
// Cat.findByIdandUpdate()    U of CRUD
// Cat.findByIdandRemove()    D of CRUD
