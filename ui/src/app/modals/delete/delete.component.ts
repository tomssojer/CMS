import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    public modalRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idArr: number[] }
  ) {}

  deleteComponent() {
    var observables = [];

    for (let i = 0; i < this.data.idArr.length; i++) {
      observables.push(
        this.http.delete('http://localhost:8080/api/text/' + this.data.idArr[i])
      );
    }

    return forkJoin(observables).subscribe(() => {
      // Close after finished forkJoin
      this.closeModal();
    });
  }

  closeModal() {
    this.modalRef.close();
  }
}
