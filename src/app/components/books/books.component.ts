import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { AuthorsService } from 'src/app/services/authors.service';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  category_id = 'seleccionar';
  author_id = 'seleccionar';
  title = '';
  description = '';
  image = '';
  listCategories: any[] = [];
  listAuthors: any[] = [];
  listBooks: any[] = [];
  book_selected: any;

  constructor(private _categories: CategoriesService, private _authors: AuthorsService, private _books: BooksService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllAuthors();
    this.getAllBooks();
  }

  getAllCategories(){
    this._categories.getAllCategories().subscribe((response)=>{
      this.listCategories = response.data;
    }, error=>{})
  }

  getAllAuthors(){
    this._authors.getAllAuthors().subscribe((response)=>{
      this.listAuthors = response.data;
    }, error=>{})
  }

  getAllBooks(){
    this.loading = true;

    this._books.getAllBooks().subscribe((response)=>{

      this.listBooks = response.data;

      setTimeout(function(){
        $('#listBooks').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listBooks').DataTable();
    },100);
  }

  reset(){
    this.title = '';
    this.description = '';
    this.image = '';
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("category_id",this.category_id);
    datos.append("author_id",this.author_id);
    datos.append("title",this.title);
    datos.append("description",this.description);
    datos.append("image",this.image);

    this._books.setBooks(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllBooks();
      this.action = 'list';
    },error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Problemas tecnicos!',
        text: 'No se pudo completar el registro, favor intente nuevamente.',
        showConfirmButton: false,
        timer: 2000
      });
      this.loading = false;
    })

  }
  
  delete(id: any): void {

    Swal.fire({
      title: 'Deseas eliminar este libro?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

        this._books.deleteBooks(id).subscribe((response)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminada correctamente!',
            showConfirmButton: false,
            timer: 2000
          });
          this.getAllBooks();
        },error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Problemas tecnicos!',
            text: 'No se pudo completar el registro, favor intente nuevamente.',
            showConfirmButton: false,
            timer: 2000
          });
        })

      }
    })
  }


}
