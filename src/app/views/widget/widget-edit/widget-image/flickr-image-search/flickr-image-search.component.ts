import {Component, OnInit} from '@angular/core';
import {FlickrService} from '../../../../../services/flickr.service';
import {WidgetService} from '../../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  websiteId: string;
  pageId: string;
  userId: string;
  widgetId: string;
  photos: [any];
  error: string;
  searchText: string;

  constructor(private flickrService: FlickrService, private widgetService: WidgetService, private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // fetch userId, pageId and websiteId from url
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
          this.widgetId = params['wgid'];
        }
      );
  }

  searchPhotos() {
    console.log('this.searchText');
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          console.log(data);
          let val = data;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          this.photos = val.photos.photo;
        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';

    console.log('flickr: ' + url);

    const widget = {
      websiteId: this.websiteId,
      pageId: this.pageId,
      widgetType: 'IMAGE',
      url: url
    };

    this.widgetService
      .updateWidget(this.widgetId, widget)
      .subscribe(
        (data: any) => {
          const result = data;
          if (result) {
            this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/'
            + this.widgetId]);
          } else {
            this.error = 'failed!';
          }
        }
      );
  }

}
