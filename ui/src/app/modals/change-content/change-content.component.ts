import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IImage } from 'src/app/models/Image';
import { IText } from 'src/app/models/Text';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-content',
  templateUrl: './change-content.component.html',
  styleUrls: ['../modals.css'],
})
export class ChangeContentComponent {
  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA)
    public data: { injectedText: IText; injectedImage: IImage }
  ) {}

  changeTextContent(newText: { id: number; name: string; content: string }) {
    this.http
      .put(
        environment.gateway + environment.textApi + "/" + this.data.injectedText.ID,
        newText
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
