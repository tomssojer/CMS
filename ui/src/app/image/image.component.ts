import { Component, OnInit } from '@angular/core';
import { IImage } from '../models/Image';
import { ImageService } from '../image.service';
import { MatDialog } from '@angular/material/dialog';
import { PostImageComponent } from '../modals/post-image/post-image.component';
import { DeleteComponent } from '../modals/delete/delete.component';
import { ChangeImageContentComponent } from '../modals/change-image-content/change-image-content.component';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  public imageArr: IImage[] = [];
  public checkedArr: number[] = [];
  public isImage: boolean = true;
  public itemCount: number = 0;
  public isImageList: boolean = true;

  constructor(private imageService: ImageService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.imageService.getImage().subscribe((data) => (this.imageArr = data));
  }

  openPostImageModal() {
    const modalRef = this.dialog.open(PostImageComponent);

    modalRef.afterClosed().subscribe(() => {
      this.fetchData();
    });
  }

  openChangeContentModal(injectedImage: IImage) {
    const modalRef = this.dialog.open(ChangeImageContentComponent, {
      data: { injectedImage: injectedImage },
    });

    modalRef.afterClosed().subscribe(() => {
      this.fetchData();
    });
  }

  openDeleteModal() {
    const modalRef = this.dialog.open(DeleteComponent, {
      data: { idArr: this.checkedArr, isImage: this.isImageList },
      exitAnimationDuration: '300ms',
    });

    modalRef.afterClosed().subscribe(() => {
      // Fetch again
      this.fetchData();

      // Update delete button
      const button = document.getElementById(
        'delete-image-button'
      ) as HTMLButtonElement | null;

      if (button != null) {
        button.disabled = true;
      }
    });
  }

  toggleDeleteButton(id: number) {
    const button = document.getElementById(
      'delete-image-button'
    ) as HTMLButtonElement | null;

    const input = document.getElementById(
      'checkbox-' + id.toString()
    ) as HTMLInputElement | null;

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
  }
}
