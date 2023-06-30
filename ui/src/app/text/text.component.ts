import { Component, OnInit } from '@angular/core';
import { TextService } from '../text.service';
import { HttpClient } from '@angular/common/http';
import { IText } from '../models/Text';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
})
export class TextComponent implements OnInit {
  public textArr: IText[] = [];

  constructor(private textService: TextService) {}

  ngOnInit(): void {
    this.textService.getText().subscribe((data) => (this.textArr = data));
  }
}
