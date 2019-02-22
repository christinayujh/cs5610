import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;

  userId: String;
  website = {};
  websites = [{}];


  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];

    });
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
    for (let x = 0; x < this.websites.length; x++) {
      this.websites[x]['url'] = '/user/' + this.userId + '/website/' + this.websites[x]['_id'];
    }
  }

  create() {
    this.website['name'] = this.loginForm.value.name;
    this.website['description'] = this.loginForm.value.description;

    this.websiteService.createWebsite(this.userId, this.website);
  }

}
