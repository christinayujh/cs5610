import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service';

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

  constructor(private router: Router, private userService: UserService, private sharedService: SharedService) {
    this.errorFlag = false;
  }

  login() {

    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    console.log(this.username);
    console.log(this.password);

    this.userService.login(this.username, this.password).subscribe((user: any) => {
      console.log(user);
      this.sharedService.user = user;
      this.errorFlag = false;
      this.router.navigate(['/user/', user._id]);
    }, (error: any) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }
}
