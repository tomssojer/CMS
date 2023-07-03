import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['../modals.css'],
})
export class DeleteComponent {
  constructor(private http: HttpClient) {}

  deleteComponent(endpoint: string) {
    return this.http
      .delete('http://localhost:8080/api/' + endpoint)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
