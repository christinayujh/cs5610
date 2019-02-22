import { Injectable } from '@angular/core';
// import { Http, RequestOptions, Response } from '@angular/http';
// // import "rxjs/Rx";
// import { environment } from '../../environments/environment';
// import { Router } from '@angular/router';

@Injectable() export class UserService {
  constructor() { }
  users = [
    {_id: '123', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder'},
    {_id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley'},
    {_id: '345', username: 'charly', password: 'charly', firstName: 'Charly', lastName: 'Garcia', email: 'charly@charly'},
    {_id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose', lastName: 'Annunzi', email: 'jannunzi@jannunzi'}

  ];

  api = {
    'createUser' : this.createUser,
    'findUserById' : this.findUserById
  };

  createUser(user: any) {
    user._id = Math.random();
    this.users.push(user);

    return user;
  }


  findUserById(userId: string) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        return this.users[x];
      }
    }
  }

  findUserByUsername(username: string) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x].username === username) {
        return this.users[x];
      }
    }
  }
  updateUser(userId, user) {
    let index;
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        index = x;
      }
    }
    this.users[index] = user;
  }
  deleteUser(userId) {
    let index;
    for (let x  = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        index = x;
      }
    }
    this.users.splice(index, 1);
  }
}