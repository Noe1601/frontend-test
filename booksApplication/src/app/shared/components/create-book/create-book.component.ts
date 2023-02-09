import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/core/models/book';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { BooksService } from 'src/app/core/services/books/books.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.sass']
})
export class CreateBookComponent implements OnInit {

  createBookForm!: FormGroup;
  bookId!: number;
  title: string = 'Crear libro';

  constructor(private formBuilder: FormBuilder,
    private _bookService: BooksService,
    private _alertService: AlertService,
    public dialogRef: MatDialogRef<CreateBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book) { }

  ngOnInit(): void {
    this.buildForm();
    this.title = this.data ? 'Actualizar libro' : 'Crear libro';
    const { id } = this.data;
    this.bookId = id;
    this.loadDataInForm();
  }

  buildForm() {
    this.createBookForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      pageCount: ['', Validators.required],
      excerpt: ['', Validators.required],
      publishDate: [new Date(), Validators.required]
    })
  }

  loadDataInForm() {
    if(this.data) {
      this.createBookForm.patchValue({
        title: this.data.title,
        description: this.data.description,
        pageCount: this.data.pageCount,
        excerpt: this.data.excerpt,
        publishDate: this.data.publishDate
      })
    }
  }

  saveBook() {
    if (!this.data) {
      this._bookService.insert(this.createBookForm.value).subscribe(data => {
        this._alertService.showAlert('success', 'Creacion libro', `Se creo el libro correctamente.`);
        this.dialogRef.close();
      }, err => {
        this._alertService.showAlert('error', 'Creacion libro', `Ocurrio un error en la creacion del libro.`);
      })
    }
    else{
      this._bookService.update(this.bookId, this.createBookForm.value).subscribe(data => {
        this._alertService.showAlert('success', 'Actualizacion libro', `Se actualizo el libro correctamente.`);
        this.dialogRef.close();
      }, err => {
        this._alertService.showAlert('error', 'Actualizacion libro', `Ocurrio un error en la actualizacion del libro.`);
      })
    }

  }
}
