var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model("User",userSchema);


userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUserName = findUserByUserName;
userModel.findByCredential = findByCredential;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.populateUsers = populateUsers;
userModel.deleteAllUser = deleteAllUser;

module.exports = userModel;


function createUser(user) {
  console.log("model"+user);
  return userModel.create(user);
}

function findUserById(id) {
  return userModel.findById(id);
}

function findUserByUserName(username) {
  return userModel.findOne({username:username});
}

function findByCredential(username,password){
  return userModel.findOne({username:username,password:password});
}

function updateUser(userId,user) {
  return userModel.findByIdAndUpdate(userId,user);
}

function deleteUser(userId){
  return userModel.findByIdAndRemove(userId);
}


function deleteAllUser() {
  return userModel.deleteMany({ });
}


function populateUsers(users) {

  return userModel.insertMany(users);
}
