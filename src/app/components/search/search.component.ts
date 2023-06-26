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
  action = 'search';
  loading: boolean = false;
  title:any = null;
  category_id:any = null;
  qfrom:any = null;
  qto:any = null;

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
    let datos = new FormData();
    datos.append("title",this.title);
    datos.append("category_id",this.category_id);
    datos.append("qfrom",this.qfrom);
    datos.append("qto",this.qto);

    this._books.setBooks(datos).subscribe((response)=>{
      this.loading = false;
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

}
