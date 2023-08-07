import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Bookedmeetinglist } from 'src/app/model/model';
import { BookedmettingService } from 'src/app/services/bookedmetting.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-bookedmeetinglist',
  templateUrl: './bookedmeetinglist.component.html',
  styleUrls: ['./bookedmeetinglist.component.css']
})
export class BookedmeetinglistComponent implements OnInit{
  meetinglist !: Bookedmeetinglist[];
  displayedColumns: string[] = ["meetingId", "meetingTitle", "startTime", "endTime", "roomName", "userName","action"];
  //,"action"
  dataSource: any;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  constructor(private service: BookedmettingService ,private router: Router,private datePipe: DatePipe, private toastr: ToastrService ){}

  ngOnInit(): void {
    this.loadbookedMeetingdetail();
    
  }

  loadbookedMeetingdetail() {
    this.service.GetMeetingDetailList().subscribe(resp => {
      this.meetinglist = resp;
      this.dataSource = new MatTableDataSource<Bookedmeetinglist>(this.meetinglist);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    })    
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  bookedMeeting(){
    this.router.navigate(['bookednewmeeting']);
  }

  editMeeting(meetingId: number) {
    this.router.navigate(['bookednewmeeting', meetingId]);
  }
  
  deleteMeeting(id: number) {
    debugger;
    this.service.deleteMeeting(id).subscribe({
      
      next: (res) => {
        this.toastr.success('Meeting Deleted Successfully', 'Success',{ positionClass: 'toast-top-center', timeOut: 1600 });       
     
      },
      error: (err) => {
        if(err.status === 200)
        this.toastr.success('Meeting Deleted Successfully', 'Success',{ positionClass: 'toast-top-center', timeOut: 1600 });
        this.loadbookedMeetingdetail();       
        console.log(err);
      }
    });
  }
}
