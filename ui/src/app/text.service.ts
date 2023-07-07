import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IText } from './models/Text';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  constructor(private http: HttpClient) {}

  getText(): Observable<IText[]> {
    return this.http
      .get<IText[]>(environment.gateway + environment.textApi)
      .pipe(
        catchError(() => {
          return throwError(() => new Error('Fetching data failed'));
        })
      );
  }
}
