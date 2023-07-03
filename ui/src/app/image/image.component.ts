import { Component, OnInit } from '@angular/core';
import { IImage } from '../models/Image';
import { ImageService } from '../image.service';
import { MatDialog } from '@angular/material/dialog';
import { PostImageComponent } from '../modals/post-image/post-image.component';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  public imageArr: IImage[] = [];
  public isImage: boolean = true;

  constructor(private imageService: ImageService, public dialog: MatDialog) {}

  openModal() {
    const modalRef = this.dialog.open(PostImageComponent);

    modalRef.afterClosed().subscribe((res) => {
      console.log('Result: ', res);
    });
  }

  ngOnInit(): void {
    this.imageService.getImage().subscribe((data) => (this.imageArr = data));
  }
}
