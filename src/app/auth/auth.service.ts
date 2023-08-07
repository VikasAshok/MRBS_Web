import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<boolean> {
    // Call the API endpoint for login and handle the response accordingly
    return this.http.post<any>('https://localhost:7064/api/User/Login', credentials)
      .pipe(
        tap((result :any) => {
          if (result.token && result.token.length > 0) {
            this.isLoggedIn = true;
          } else {
            this.isLoggedIn = false;
          }
        })
      );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
