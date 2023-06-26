import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = '';
  token:any;
  options:any;

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('users');
    this.token = localStorage.getItem('token');
    this.options = {headers: {'Authorization': 'Bearer '+this.token}};
  }

  getAllUsers(): Observable<any>{
    const url = this.url;
    return this.http.get(url, this.options);
  }

  setUsers(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json, this.options);
  }

  updateUsersPassword(id: any, json: any): Observable<any>{
    const url = this.url+'/reset_password/'+id;
    return this.http.post(url, json);
  }

  deleteUsers(id: number): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.delete(url, this.options);
  }


}
