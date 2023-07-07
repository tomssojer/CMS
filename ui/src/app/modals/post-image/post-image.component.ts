import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['../modals.css'],
})
export class PostImageComponent {
  constructor(private http: HttpClient) {}

  file!: File;

  onSelected(event: any) {
    // console.log(event);
    this.file = <File>event.target.files[0];
  }

  postImage() {
    const formData = new FormData();
    // formData.append('Name', image.name);
    formData.set('Image', this.file);

    console.log(this.file.name);
    console.log(this.file.type);
    console.log(this.file.size);
    formData.delete('');
    console.log(formData.get('Image'));

    if (this.file == undefined) {
      alert('Undefined');
    }

    this.http
      .post(environment.gateway + environment.imageApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .subscribe(
        (res) => console.log(res),
        (error) => console.log(error)
      );
  }
}
