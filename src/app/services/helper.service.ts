import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  url = '';
  enviroment = 'prod';

  constructor() {
    if(this.enviroment == 'prod'){
      this.url = 'https://api-tm.varaturno.online';
    }else if(this.enviroment == 'dev'){
      this.url = 'https://api-tm.varaturno.online';
    }
  }

  getUrl(params: any): string{
    return this.url+'/api/'+params;
  }

  getUrlForDocument(params: any): string{
    return this.url+'/storage/'+params;
  }
  
}
