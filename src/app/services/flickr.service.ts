import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable() // needed as we're injecting Http service into this service
export class FlickrService {

  urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=007d3ca946cbdd2230f55d22a5c0b3e2&text=';

  constructor(private _http: HttpClient) {
  }

  searchPhotos(searchTerm: any) {
    const url = this.urlBase + searchTerm;
    return this._http.get(url, {responseType: 'text'});
  }
}
