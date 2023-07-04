import { Component, OnInit } from '@angular/core';
import { TextService } from '../text.service';
import { IText } from '../models/Text';
import { MatDialog } from '@angular/material/dialog';
import { PostTextComponent } from '../modals/post-text/post-text.component';
import { DeleteComponent } from '../modals/delete/delete.component';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
})
export class TextComponent implements OnInit {
  public textArr: IText[] = [];
  public checkedArr: number[] = [];
  public itemCount: number = 0;
  public currentItemId: number | undefined;

  constructor(private textService: TextService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.textService.getText().subscribe((data) => (this.textArr = data));
  }

  openPostTextModal() {
    const modalRef = this.dialog.open(PostTextComponent);

    modalRef.afterClosed().subscribe((res) => {
      console.log('Result: ', res);
      this.textService.getText().subscribe((data) => (this.textArr = data));
    });
  }

  openDeleteModal() {
    const modalRef = this.dialog.open(DeleteComponent, {
      data: { id: this.currentItemId },
    });

    console.log('current item id: ', this.currentItemId);

    modalRef.afterClosed().subscribe((res) => {
      console.log('Result: ', res);
      this.textService.getText().subscribe((data) => (this.textArr = data));
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
      // If checked is false
      if (input.checked == false) {
        this.itemCount++;
        button.disabled = false;
        this.checkedArr.push(id);

        // For now we use just one element
        this.currentItemId = id;
      }
      // Else if checked is true
      else {
        this.itemCount--;

        for (let i = 0; i < this.checkedArr.length; i++) {
          if (this.checkedArr[i] == id) {
            this.checkedArr.splice(i, 1);
          }
        }

        if (this.itemCount == 0) {
          button.disabled = true;
        }
      }
    }
  }
}
