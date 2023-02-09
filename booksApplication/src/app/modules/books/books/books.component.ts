import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { Book } from 'src/app/core/models/book';
import { BooksService } from 'src/app/core/services/books/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {

  constructor(private _bookService: BooksService) { }

  books$!: Observable<Book[]>;
  books: Book[] = [];

  ngOnInit(): void {
    this.getAllBooks();
  }

  displayedColumns: string[] = ['id', 'title', 'description', 'pageCount', 'excerpt', 'publishDate'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllBooks() {
    this.books$ = this._bookService.getAll().pipe(
      tap((books: Book[]) => {
        this.books = books;
        this.dataSource.data = this.books;
      })
    )
  }

}
