import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, forkJoin } from 'rxjs';
import { TextService } from 'src/app/text.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['../modals.css'],
})
export class DeleteComponent {
  constructor(
    private http: HttpClient,
    private textService: TextService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  deleteComponent() {
    // for (let i = 0; i < idArr.length; i++) {
    //   console.log('http://localhost:8080/api/' + idArr[i]);

    return this.http
      .delete('http://localhost:8080/api/text/' + this.data.id)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
