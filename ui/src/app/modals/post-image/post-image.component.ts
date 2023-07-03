import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['../modals.css'],
})
export class PostImageComponent {
  constructor(private http: HttpClient) {}

  postImage(image: { name: string; url: string }) {
    this.http
      .post('http://localhost:8080/api/images', image)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
