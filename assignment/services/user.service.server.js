module.exports = function (app) {

  var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonderland"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];

  app.get("/api/user/:userId", findUserById);
  app.get("/api/user", findUserByCred);
  app.post("/api/user", createUser);
  app.get("/api/user", findUserByUsername);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);


  function createUser(req, res) {
    let user = {};
    user.username = req.body.username;
    user.password = req.body.password;
    user.lastName = req.body.lastName;
    user.firstName = req.body.firstName;
    user._id = Math.round(Math.random() * 10000).toString();
    users.push(user);
    res.send({user});
  }

  function findUserById(req, res) {

    //console.log("hit find user by id...");

    var id = req.params.userId;

    for (var i in users){
      if(users[i]._id === id){
        res.send(users[i]);
        return;
      }
    } res.status(404).send("Not found");
  }

  function findUserByCred(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    for(var i in users) {
      if(users[i].username === username && users[i].password === password) {
        if(res.send(users[i]));
        return;
      }
    }
    res.status(404).send("Not found");
  }

  function findUserByUsername(req, res) {
    var username = req.query["username"];
    for(var i in users) {
      if(users[i].username === username) {
        if(res.send(users[i]));
        return;
      }
    }
    res.status(404).send("Not found");
  }

  function updateUser(req, res){
    var id = req.params.userId;

    for (var i in users){
      if(users[i]._id === id){
        users[i].username = req.body.username;
        users[i].password = req.body.password;
        users[i].lastName = req.body.lastName;
        users[i].firstName = req.body.firstName;
        res.send(users[i]);
        return;
      }
    }
    res.status(404).send("Not found");
  }

  function deleteUser(req, res){
    var id = req.params.userId;
    for (var i in users){
      if(users[i]._id === id){
        users.splice(i, 1);
        res.send({});
        return;
      }
    }
    res.status(404).send("Not found");
  }
}
