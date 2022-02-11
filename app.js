let PersonModel = require('./models/person');
let mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
class Database {
  constructor() {
    this._connect()
  }
_connect() {
     mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
module.exports = new Database()

//CreateOnepeople
let FirstPerson = new PersonModel({ name: 'amehhu', age: 20 , favoriteFoods : ["Fast-Food"]});
FirstPerson.save(function (err, data) {
  if (err) { throw err; }
  console.log(data);
});

//CreateManypeople
PersonModel.create([{ name: 'amani', age: 29 , favoriteFoods : ["pizza" , "banane"]},
{ name: 'zouhour', age: 25 , favoriteFoods : ["couscouse" ]},
{ name: 'zouhour', age: 18 , favoriteFoods : ["couscouse", "pizza" ]},
{ name: 'oumaima', age: 23 , favoriteFoods : ["pizza" , "cake"]}], function(err, arrayOfPeople){
  if (err) { throw err; }
  console.log(arrayOfPeople);
});

// -------------------------------find --------------------------------------------------------

function done (a){
  console.log(a)
}

//findPeopleByName
var findPeopleByName = function(personName , done){
PersonModel.find({name : personName},(err,data)=>{
  if(err) return done(err);
   else return  done(data);       
}); 
};
//findPeopleByName ("oumaima",done)

//findOneByFood
var findOneByFood = function(food ,done){
  PersonModel.findOne({favoriteFoods : food},(err,data)=>{
    if(err) return done(err);
     else return  done(data);       
  }); 
};
//findOneByFood ("pizza",done)

//findPersonById
var findPersonById = function(personId , done ) {
  PersonModel.findById({_id : personId},(err,data)=>{
      if(err) return done(err);
       else return  done(data);       
    }); 
  };
//findPersonById ('62019065d0e30b7ed4bfbcb8',done)


// --------------------------------------Updates --------------------------------------------------------

  var findEditThenSave = function(personId, done, foodToAdd) {
    PersonModel.findById({_id : personId},(err,data)=>{
      if(err) return done(err);
       else{
        data.favoriteFoods.push(foodToAdd)
        data.save()
        return  done(data);  
       }     
    }); 
  };
  //findEditThenSave ('62019065d0e30b7ed4bfbcb8',done, 'hamburger')

  
  var findAndUpdate = function(personName, NewAge, done) {
    PersonModel.findOneAndUpdate({name : personName},{age : NewAge}, (err,data)=>{
      if(err) return done(err);
       else{
        data.save()
        return done(data);  
       }     
    }); 
  };
  //findAndUpdate ('zouhour', 20, done) 

// --------------------------------------Delete --------------------------------------------------------

   var DeleteOnePerson = function(personId, done) {
    PersonModel.findByIdAndRemove({_id : personId},(err,data)=>{
      if(err) return done(err);
       else{
        data.save()
        return done(data);  
       }     
    }); 
  };
//DeleteOnePerson('620190c6e6dec0ee434d81ea', done) 

var DeleteManyPerson = function(personName, done) {
    PersonModel.remove({name : personName},(err,data)=>{
      if(err) return done(err);
       else{
        return done(data);  
       }     
    }); 
  };
//DeleteManyPerson ('zouhour', done) 

var ChainSearchQuery = function(foodToSearch, done) {
   PersonModel.find({favoriteFoods:foodToSearch}).sort({name : "asc"}).limit(2).select("-age").exec((err, data) => {
    if(err) return done(err);
      else {
        return done(data);  
      }     
  }); 
}
//ChainSearchQuery("pizza",done);