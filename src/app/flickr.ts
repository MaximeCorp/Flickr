// src/app/flickr.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlickrService {
  private apiUrl = 'https://api.flickr.com/services/rest/';
  private apiKey = environment.flickrApiKey;

  constructor(private http: HttpClient) {}

  searchPhotos(params: any): Observable<any> {
    let httpParams = new HttpParams()
      .set('method', 'flickr.photos.search')
      .set('api_key', this.apiKey)
      .set('format', 'json')
      .set('nojsoncallback', '1')
      .set('safe_search', '1');

    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    }

    return this.http.get(this.apiUrl, { params: httpParams });
  }

  getPhotoUrl(
    photo: any,
    size: 'small' | 'medium' | 'large' = 'medium'
  ): string {
    let sizeSuffix = '';
    if (size === 'small') sizeSuffix = '_q';
    if (size === 'medium') sizeSuffix = '_b';
    if (size === 'large') sizeSuffix = '_k';

    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}${sizeSuffix}.jpg`;
  }

  getPhotoDetails(photoId: string): Observable<any> {
    const params = new HttpParams()
      .set('method', 'flickr.photos.getInfo')
      .set('api_key', this.apiKey)
      .set('photo_id', photoId)
      .set('format', 'json')
      .set('nojsoncallback', '1');

    return this.http.get(this.apiUrl, { params });
  }

  getPhotoComments(photoId: string): Observable<any> {
    const params = new HttpParams()
      .set('method', 'flickr.photos.comments.getList')
      .set('api_key', this.apiKey)
      .set('photo_id', photoId)
      .set('format', 'json')
      .set('nojsoncallback', '1');

    return this.http.get(this.apiUrl, { params });
  }
}
