import { Component, OnInit } from '@angular/core';
import { IImage } from '../models/Image';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  public imageArr: IImage[] = [];

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.getImage().subscribe((data) => (this.imageArr = data));
  }
}
