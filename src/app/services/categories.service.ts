import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url: string = '';
  token:any;
  options:any;

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('categories');
    this.token = localStorage.getItem('token');
    this.options = {headers: {'Authorization': 'Bearer '+this.token}};
  }

  getAllCategories(): Observable<any>{
    const url = this.url;
    return this.http.get(url, this.options);
  }

  getCategories(identification: string): Observable<any>{
    const url = this.url+'/'+identification;
    return this.http.get(url, this.options);
  }

  setCategories(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json, this.options);
  }

  deleteCategories(id: number): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.delete(url, this.options);
  }


}
