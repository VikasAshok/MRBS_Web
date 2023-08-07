import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookedmeetinglist } from '../model/model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BookedmettingService {

  apiUrl= "https://localhost:7064/api/";
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  GetMeetingDetailList(): Observable<Bookedmeetinglist[]> {
    return this.http.get<Bookedmeetinglist[]>(`${this.apiUrl}Meeting/Get`);
  }   
 
  
  deleteMeeting(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}Meeting/DeleteMeetingDetail?id=${id}`)
      .pipe(
        catchError((error) => {
          if (error.status === 409) {
            // Conflict error occurred, handle it here
            // For example, you can show an error message to the user
            this.toastr.error('Cannot delete the meeting as it is currently ongoing.', 'Conflict',{ positionClass: 'toast-top-center', timeOut: 1600 });
          }
          return throwError(error); // Rethrow the error for the component to handle
        })
      );
  }
  
  
}
