import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;

  userId: String;
  websites = [{}];


  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];

    });
    this.websiteService.findWebsitesByUser(this.userId).subscribe(
      data => {
        this.websites = data;
      }
    );
  }

  create() {
    const website = {name: this.loginForm.value.name, description: this.loginForm.value.description};
    console.log(website);
    this.websiteService.createWebsite(this.userId, website).subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
