import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-text',
  templateUrl: './post-text.component.html',
  styleUrls: ['../modals.css'],
})
export class PostTextComponent {
  constructor(
    public dialog: MatDialogRef<PostTextComponent>,
    private http: HttpClient
  ) {}

  onClose(): void {
    this.dialog.close();
  }

  postText(text: { id: number; name: string; content: string }) {
    console.log(text);

    this.http
      .post(environment.gateway + environment.textApi, text)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
