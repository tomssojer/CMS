import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextComponent } from './text/text.component';
import { ImageComponent } from './image/image.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'text',
    component: TextComponent,
    title: 'Text',
  },
  {
    path: 'images',
    component: ImageComponent,
    title: 'Images',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
