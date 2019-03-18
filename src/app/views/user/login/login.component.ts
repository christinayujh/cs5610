import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';

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

    this.userService.findUserByCredential(this.username, this.password).subscribe(
      (data: any) => {
        this.errorFlag = false;
        this.router.navigate(['/user/' + data._id]);
        },
      (error: any) => { this.errorFlag = true; }
    );
  }

  ngOnInit() {
  }
}
