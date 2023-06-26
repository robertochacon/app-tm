import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-entities',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  name = '';
  listCategories: any[] = [];

  constructor(private _categories: CategoriesService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.loading = true;

    this._categories.getAllCategories().subscribe((response)=>{

      this.listCategories = response.data;

      setTimeout(function(){
        $('#listCategories').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listCategories').DataTable();
    },100);
  }

  reset(){
    this.name = '';
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("name",this.name);

    this._categories.setCategories(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllCategories();
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
      title: 'Deseas eliminar esta categoria?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

        this._categories.deleteCategories(id).subscribe((response)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminada correctamente!',
            showConfirmButton: false,
            timer: 2000
          });
          this.getAllCategories();
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
