
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: User;
  userId: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.userService.findUserById(this.userId).subscribe(
        data => {
          this.user = data;
        });
    });
  }

  UpdateUser() {
    this.userService.updateUser(this.user).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/user/' + this.userId]);
      }
    );
  }

  logout() {
    this.userService.logout().subscribe();
    this.router.navigate(['/login']);
  }
}

