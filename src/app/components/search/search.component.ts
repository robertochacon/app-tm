import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  listCategories: any[] = [];
  listBooks: any[] = [];
  action = 'search';
  loading: boolean = false;
  title:any = null;
  category_id:any = null;
  qfrom:any = null;
  qto:any = null;
  book_selected:any;

  constructor(private _categories: CategoriesService, private _books: BooksService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this._categories.getAllCategories().subscribe((response)=>{
      this.listCategories = response.data;
    }, error=>{})
  }

  search(): void {

    this.loading = true;
    let datos = {
      "title":this.title,
      "category_id":this.category_id,
      "qfrom":this.qfrom,
      "qto":this.qto
    }

    this._books.searchBooks(datos).subscribe((response)=>{
      this.listBooks = response.data;
        this.loading = false;
        this.action = 'list';
        this.title = null;
        this.category_id = null;
        this.qfrom = null;
        this.qto = null;
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

}
