import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

//import { base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  apiUrl= "https://localhost:7064/api/";
  constructor(private http : HttpClient) { }

  onLogin(obj :any) : Observable<any> {   
    return this.http.post(this.apiUrl + 'User/Login',obj)

  }
//For Guard will return true if userLoggedIn
  get isLoggedIn(): boolean {
  const user = localStorage.getItem('userDetails');
  return user !== null ? true : false; 


  }



  
}
