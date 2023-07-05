import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IText } from 'src/app/models/Text';

@Component({
  selector: 'app-change-content',
  templateUrl: './change-content.component.html',
  styleUrls: ['../modals.css'],
})
export class ChangeContentComponent {
  constructor(
    private dialog: MatDialogRef<ChangeContentComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { injectedText: IText }
  ) {}

  changeContent(newText: {id: number, name: string, content: string}) {
    this.http
      .put(
        'http://localhost:8080/api/text/' + this.data.injectedText.ID,
        newText
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
