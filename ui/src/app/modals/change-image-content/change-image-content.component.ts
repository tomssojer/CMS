import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IImage } from 'src/app/models/Image';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-image-content',
  templateUrl: './change-image-content.component.html',
  styleUrls: ['../modals.css'],
})
export class ChangeImageContentComponent {
  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA)
    public data: { injectedImage: IImage }
  ) {}

  changeImageContent(newImage: { id: number; name: string }) {
    this.http
      .put(
        environment.gateway +
          environment.imageApi +
          '/' +
          this.data.injectedImage.ID,
        newImage
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
