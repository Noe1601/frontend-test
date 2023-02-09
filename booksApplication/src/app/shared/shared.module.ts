import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material.module';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    BookDetailComponent,
    CreateBookComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    BookDetailComponent,
    CreateBookComponent
  ]
})
export class SharedModule { }
