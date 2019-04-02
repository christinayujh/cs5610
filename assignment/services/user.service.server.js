module.exports = function (app) {

  app.put("/api/user/:userId", updateUserById);
  app.post("/api/user", createUser);
  app.get("/api/users", findAllUsers);

  app.get("/api/user/hello", helloUser);
  app.get("/api/user/:userId", findUserById)
  app.get("/api/user", findUsers);

  //delete me when push to heroku
  app.get("/api/populate", populateUsers);
  app.get("/api/deleteAllUser", deleteAllUser);

  var userModel = require('../models/user/user.model.server');

  var users_pop = [
    {username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonderland"  },
    {username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email:"aaa@hotmail.com" }
  ];

  // var users = [
  //   {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonderland"  },
  //   {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
  //   {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
  //   {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  // ];

  function helloUser(req, res) {
    res.send("Hello from user service!");
  }

  function populateUsers(req,res) {
    console.log("pop DB!");
    //res.send("pop DB!");
    userModel.populateUsers(users_pop)
      .then(
        function (users) {
          console.log("users populated!");
          res.json(users);
        },
        function (error) {
          if (error) {
            console.log(error);
            res.statusCode(400).send(error);
          }
        }
      );
  }

  function deleteAllUser(req,res) {
    console.log("pop DB!");
    //res.send("pop DB!");
    userModel.deleteAllUser()
      .then(
        function (users) {
          console.log("users populated!");
        },
        function (error) {
          if (error) {
            console.log(error);
            res.statusCode(400).send(error);
          }
        }
      );
  }

  function findUserById(req, res) {
    var userId = req.params["userId"];
    userModel
      .findUserById(userId)
      .exec(
        function (err,user) {
          if(err){
            return res.sendStatus(400).send(err);
          }
          return  res.json(user);
        }
      );
  }

  function findAllUsers(req, res){
    //res.json(users);
    userModel
      .find()
      .exec(
        function (err,users) {
          if(err){
            return res.sendStatus(400).send(err);
          }
          return  res.json(users);
        }
      );
  }

  function findUsers(req, res){
    var username = req.query["username"];
    var password = req.query["password"];

    userModel
      .findByCredential(username,password)
      .exec(
        function (err,user) {
          if(err){
            return res.sendStatus(400).send(err);
          }
          return res.json(user);
        }
      );
  }

  function updateUserById(req, res){
    var userId = req.params['userId'];
    var user = req.body;

    userModel
      .updateUser(userId,user)
      .then(
        function (user) {
          res.json(user);
        },
        function (err) {
          res.statusCode(400).send(err);
        }
      );
  }

  function createUser(req, res) {
    var user = req.body;
    userModel
      .createUser(user)
      .then(
        function (user) {
          console.log("user created!");
          res.json(user);
        },
        function (error) {
          if (error) {console.log(error);
            res.statusCode(400).send(error);
          }
        }
      )
  }

}
