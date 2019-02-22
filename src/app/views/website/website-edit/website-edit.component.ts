import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;

  userId: string;
  websiteId: string;
  website = {};
  websites = [{}];


  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.website = this.websiteService.findWebsiteById(params.wid);
    });
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
    for (let x = 0; x < this.websites.length; x++) {
      this.websites[x]['url'] = '/user/' + this.userId + '/website/' + this.websites[x]['_id'];
    }
  }

  update() {
    this.website['name'] = this.loginForm.value.name;
    this.website['description'] = this.loginForm.value.description;

    this.websiteService.updateWebsite(this.userId, this.website);
  }

  delete() {
    this.websiteService.deleteWebsite(this.websiteId);
  }
}
