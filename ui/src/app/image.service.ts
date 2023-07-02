import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IImage } from './models/Image';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getImage(): Observable<IImage[]> {
    return this.http.get<IImage[]>('http://localhost:8080/api/images').pipe(
      catchError(() => {
        return throwError(() => new Error('Image fetching failed'));
      })
    );
  }
}
