import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css'],
})
export class PostModalComponent {
  constructor(
    public dialog: MatDialogRef<PostModalComponent>,
    private http: HttpClient
  ) {}

  onClose(): void {
    this.dialog.close();
  }

  postText(text: { name: string; content: string }) {
    console.log(text);

    this.http.post('http://localhost:8080/api/text', text).subscribe((res) => {
      console.log(res);
    });
  }
}
