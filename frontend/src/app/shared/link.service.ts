import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Link } from './link.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(
    private http: HttpClient,
  ) {}

  getLink(url: string) {
    return this.http.post<Link>(environment.apiUrl + '/links', { url })
      .pipe(map((result) => {
        return new Link(result._id, result.shortUrl, result.originalUrl);
      }));
  }

}
