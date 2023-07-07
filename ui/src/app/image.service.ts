import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IImage } from './models/Image';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getImage(): Observable<IImage[]> {
    return this.http
      .get<IImage[]>(environment.gateway + environment.imageApi)
      .pipe(
        catchError(() => {
          return throwError(() => new Error('Image fetching failed'));
        })
      );
  }
}
