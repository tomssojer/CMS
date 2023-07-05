import { Component, OnInit } from '@angular/core';
import { TextService } from '../text.service';
import { IText } from '../models/Text';
import { MatDialog } from '@angular/material/dialog';
import { PostTextComponent } from '../modals/post-text/post-text.component';
import { DeleteComponent } from '../modals/delete/delete.component';
import { ChangeContentComponent } from '../modals/change-content/change-content.component';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
})
export class TextComponent implements OnInit {
  public textArr: IText[] = [];
  public checkedArr: number[] = [];
  public itemCount: number = 0;
  public currentItemId!: number;

  constructor(private textService: TextService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    return this.textService
      .getText()
      .subscribe((data) => (this.textArr = data));
  }

  openPostTextModal() {
    const modalRef = this.dialog.open(PostTextComponent, {
      exitAnimationDuration: '300ms',
    });

    modalRef.afterClosed().subscribe((res) => {
      this.fetchData();
    });
  }

  openChangeContentModal(injectedText: IText) {
    const listItem = document.getElementById(
      'item-' + injectedText.ID
    ) as HTMLDivElement | null;

    if (listItem != null) {
      const attribute = listItem.getAttribute('data-attr');
      if (attribute != 'true') {
        console.log('Attribute: ', attribute);
        return;
      }
    }

    const modalRef = this.dialog.open(ChangeContentComponent, {
      data: {injectedText: injectedText},
    });

    console.log('Modal opened');

    modalRef.afterClosed().subscribe(() => {
      this.fetchData();
    });
  }

  openDeleteModal() {
    const modalRef = this.dialog.open(DeleteComponent, {
      data: { idArr: this.checkedArr },
      exitAnimationDuration: '300ms',
    });

    modalRef.afterClosed().subscribe(() => {
      // Fetch again
      this.fetchData();

      // Update delete button
      const button = document.getElementById(
        'delete-text-button'
      ) as HTMLButtonElement | null;

      if (button != null) {
        button.disabled = true;
      }
    });
  }

  toggleDeleteButton(id: number) {
    console.log('Button clicked');

    const button = document.getElementById(
      'delete-text-button'
    ) as HTMLButtonElement | null;

    const input = document.getElementById(
      'checkbox-' + id.toString()
    ) as HTMLInputElement | null;

    const listItem = document.getElementById(
      'item-' + id
    ) as HTMLDivElement | null;

    // If false, it should not be opened
    if (listItem != null && listItem.hasAttribute('data-attr')) {
      listItem.setAttribute('data-attr', 'false');
      console.log('Attribute: ', listItem.getAttribute('data-attr'));
    }

    if (input != null && button != null) {
      // If checked is false
      if (input.checked == true) {
        this.itemCount++;
        button.disabled = false;
        this.checkedArr.push(id);
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
    if (listItem != null && listItem.hasAttribute('data-attr')) {
      listItem.setAttribute('data-attr', 'true');
      console.log('Attribute: ', listItem.getAttribute('data-attr'));
    }
  }
}
