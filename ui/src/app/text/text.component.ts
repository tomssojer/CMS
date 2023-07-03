import { Component, OnInit } from '@angular/core';
import { TextService } from '../text.service';
import { IText } from '../models/Text';
import { MatDialog } from '@angular/material/dialog';
import { PostTextComponent } from '../modals/post-text/post-text.component';
import { DeleteComponent } from '../modals/delete/delete.component';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
})
export class TextComponent implements OnInit {
  public textArr: IText[] = [];
  public itemCount: number = 0;

  constructor(private textService: TextService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.textService.getText().subscribe((data) => (this.textArr = data));
  }

  openPostTextModal() {
    const modalRef = this.dialog.open(PostTextComponent);

    modalRef.afterClosed().subscribe((res) => {
      console.log('Result: ', res);
    });
  }

  openDeleteModal() {
    const modalRef = this.dialog.open(DeleteComponent);

    modalRef.afterClosed().subscribe((res) => {
      console.log('Result: ', res);
    });
  }

  toggleDeleteButton(id: number) {
    const button = document.getElementById(
      'delete-text-button'
    ) as HTMLButtonElement | null;

    const input = document.getElementById(
      'checkbox-' + id.toString()
    ) as HTMLInputElement | null;

    if (input != null && button != null) {
      if (input.checked == false) {
        this.itemCount++;
        button.disabled = false;
      } else {
        this.itemCount--;

        if (this.itemCount == 0) {
          button.disabled = true;
        }
      }
    }
  }
}
