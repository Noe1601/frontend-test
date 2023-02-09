import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BooksService } from './services/books/books.service';

@NgModule({
    imports: [HttpClientModule],
  providers: [BooksService]
})
export class CoreModule { }
