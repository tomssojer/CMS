import { Component, OnInit } from '@angular/core';
import { TextService } from '../text.service';
import { IText } from '../models/Text';
import { MatDialog } from '@angular/material/dialog';
import { PostModalComponent } from '../post-modal/post-modal.component';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
})
export class TextComponent implements OnInit {
  public textArr: IText[] = [];

  constructor(private textService: TextService, public dialog: MatDialog) {}

  openModal() {
    const modalRef = this.dialog.open(PostModalComponent);

    modalRef.afterClosed().subscribe((res) => {
      console.log("Result: ", res);
    });
  }

  ngOnInit(): void {
    this.textService.getText().subscribe((data) => (this.textArr = data));
  }
}
