import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { Book } from 'src/app/core/models/book';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { BooksService } from 'src/app/core/services/books/books.service';
import { BookDetailComponent } from 'src/app/shared/components/book-detail/book-detail.component';
import { CreateBookComponent } from 'src/app/shared/components/create-book/create-book.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {

  constructor(private _bookService: BooksService,
    private _alertService: AlertService,
    private dialog: MatDialog) { }

  books$!: Observable<Book[]>;
  books: Book[] = [];

  ngOnInit(): void {
    this.getAllBooks();
  }

  displayedColumns: string[] = ['id', 'title', 'description', 'pageCount', 'excerpt', 'publishDate', 'Acciones'];
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

  deleteBook(book: Book) {
    this._alertService.questionAlert(`Esta seguro de eliminar el libro ${ book.title }?`).then(
      (result) => {
        if(result.isConfirmed) {
          this._bookService.delete(book.id).subscribe(bookDeleted => {
            this._alertService.showAlert('success', 'Remover libro', `El libro ${ book.title } fue removido exitosamente.`)
          }, err => {
            this._alertService.showAlert('error', 'Remover libro', `Ocurrio un error al remover el libri ${ book.title }.`)
          })
        }
      }
    )
  }

  showDetail(boook: Book) {
    this._bookService.findbyId(boook.id).subscribe((book: Book) => {
      this.dialog.open(BookDetailComponent, {
        data: book
      })
    })
  }

  showCreateForm(book?: Book) {
    this.dialog.open(CreateBookComponent, { width: '500px', data: book });
  }

}
