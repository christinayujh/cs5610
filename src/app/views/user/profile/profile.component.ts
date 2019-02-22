/*
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service.client';

export class User {
  _id: String;
  username: String;
  password: String;

  firstName: String;
  lastName: String;
  email?: String;

  constructor(_id, username, password, firstName, lastName, email) {
    this._id = _id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  userId: string;

  constructor(private router: ActivatedRoute, private userService: UserService) {}

  UpdateUser() {
    console.log(this.user.username);
    console.log(this.user.firstName);
    console.log(this.user.lastName);
    this.userService.updateUser(this.userId, this.user);
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.userId = params['uid'];
      this.user = this.userService.findUserById(this.userId);
      console.log('user id: ' + this.user._id);
    });
  }
}

