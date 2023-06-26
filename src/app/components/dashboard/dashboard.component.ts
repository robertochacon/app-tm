import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = false;
  name: any = '';
  users = 0;
  documents = 0;
  shipments = 0;
  deliverys = 0;

  @Input() page: string = 'dashboard';
  constructor() { 
    this.name = localStorage.getItem('name');
  }

  ngOnInit(): void {
    // this.getAllInfo();
  }

}
