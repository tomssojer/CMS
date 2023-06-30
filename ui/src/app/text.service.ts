import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IText } from './models/Text';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  constructor(private http: HttpClient) {}

  getText(): Observable<IText[]> {
    return this.http.get<IText[]>('http://localhost:8080/api/text');
  }
}