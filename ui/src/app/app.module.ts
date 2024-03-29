import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TextComponent } from './text/text.component';
import { ImageComponent } from './image/image.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { PostImageComponent } from './modals/post-image/post-image.component';
import { PostTextComponent } from './modals/post-text/post-text.component';
import { DeleteComponent } from './modals/delete/delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChangeContentComponent } from './modals/change-content/change-content.component';
import { ChangeImageContentComponent } from './modals/change-image-content/change-image-content.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TextComponent,
    ImageComponent,
    HomeComponent,
    PostImageComponent,
    PostTextComponent,
    DeleteComponent,
    ChangeContentComponent,
    ChangeImageContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatListModule,
    MatGridListModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
