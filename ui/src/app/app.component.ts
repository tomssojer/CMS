import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cms';

  // constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.getText();
  // }

  // onTextFetch() {
  //   this.getText();
  // }

  // private getText() {
  //   this.http.get('localhost:8080/text').subscribe((res) => {
  //     console.log(res);
  //   });
  // }
}
