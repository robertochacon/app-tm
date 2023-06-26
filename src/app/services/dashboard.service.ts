import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url: string = '';
  token:any;
  options:any;

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('dashboard');
    this.token = localStorage.getItem('token');
    this.options = {headers: {'Authorization': 'Bearer '+this.token}};
  }

  getAllInfo(): Observable<any>{
    const url = this.url;
    return this.http.get(url, this.options);
  }

}
