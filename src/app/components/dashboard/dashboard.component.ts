import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = false;
  name: any = '';
  categories = 0;
  authors = 0;
  books = 0;
  users = 0;

  @Input() page: string = 'dashboard';
  constructor(private _dashboard: DashboardService) { 
    this.name = localStorage.getItem('name');
  }

  ngOnInit(): void {
    this.getAllInfo();
  }

  getAllInfo(){
    this.loading = true;

    this._dashboard.getAllInfo().subscribe((response)=>{
      this.categories = response.data.categories;
      this.authors = response.data.authors;
      this.books = response.data.books;
      this.users = response.data.users;
    }, error=>{})

  }

}
