import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { BooksComponent } from './books/books/books.component';
import { ModulesRoutingModule } from './modules.routing.module';

@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    ModulesRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [BooksComponent]
})
export class ModulesModule { }
