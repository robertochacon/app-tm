import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthorsService } from 'src/app/services/authors.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  name = '';
  image = '';
  listAuthors: any[] = [];

  constructor(private _authors: AuthorsService) { }

  ngOnInit(): void {
    this.getAllAuthors();
  }

  getAllAuthors(){
    this.loading = true;

    this._authors.getAllAuthors().subscribe((response)=>{

      this.listAuthors = response.data;

      setTimeout(function(){
        $('#listAuthors').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listAuthors').DataTable();
    },100);
  }

  reset(){
    this.name = '';
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("name",this.name);
    datos.append("image",this.image);

    this._authors.setAuthors(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllAuthors();
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

        this._authors.deleteAuthors(id).subscribe((response)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminada correctamente!',
            showConfirmButton: false,
            timer: 2000
          });
          this.getAllAuthors();
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
