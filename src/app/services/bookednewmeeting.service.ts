import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookednewmeetingService {

  apiUrl = "https://localhost:7064/api/";

  constructor(private http: HttpClient) { }

  GetAllLocation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Location/Get`);
  }

  GetMettingRoomByLocation(locationId: any): Observable<any[]> {
    var url = `${this.apiUrl}MeetingRoom/GetByLocationId?id=${locationId}`;
    return this.http.get<any[]>(url); 
  }

  saveBookednewmeetig(payload: any) {
    return this.http.post(`${this.apiUrl}Meeting/AddMeetingDetail`, payload);
  }

  updateMeeting(payload: any) {
    return this.http.post(`${this.apiUrl}Meeting/AddMeetingDetail`, payload);
  }

  GetMeetingDetailById(meetingId: number): Observable<any> {
    var url = `${this.apiUrl}Meeting/GetById?id=${meetingId}`;
    return this.http.get<any[]>(url)  ;   
  }

  updateBookedMeeting(meetingId: number, payload: any): Observable<any> {
    var url = `${this.apiUrl}Meeting/UpdateMeetingDetail?id=${meetingId}`;
    return this.http.put(url, payload);
  }

 
}
