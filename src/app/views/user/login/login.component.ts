import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {User} from '../profile/profile.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  username: string; // see usage as two-way data binding
  password: string; // see usage as two-way data binding

  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private router: Router, private userService: UserService) {
    this.errorFlag = false;
  }

  login() {

    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    console.log(this.username);
    console.log(this.password);

    let user;
    user = this.userService.findUserByUsername(this.username);
    if (user == null ||  user.password !== this.password)  {
      this.errorFlag = true;
    } else {
      this.router.navigate(['/user', user._id]);
    }
  }

  ngOnInit() {
    console.log(this.userService.users);
  }
}
