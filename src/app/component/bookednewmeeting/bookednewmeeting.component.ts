import { Component, OnInit } from '@angular/core';
import { BookednewmeetingService } from 'src/app/services/bookednewmeeting.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bookedmeetinglist } from 'src/app/model/model';

@Component({
  selector: 'app-bookednewmeeting',
  templateUrl: './bookednewmeeting.component.html',
  styleUrls: ['./bookednewmeeting.component.css']
})
export class BookednewmeetingComponent implements OnInit {
  bookednewmeetingForm!: FormGroup;
  subscription: Subscription = new Subscription();
  locationDetails: any[] = [];
  meetingDetails: any[] = [];
  isEditMode: boolean = false;
  meetingId: number;
  meetingTitle:string="";
  //bookingModel :Bookedmeetinglist;
  constructor(
    private formBuilder: FormBuilder,
    private service: BookednewmeetingService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    
  ) { this.meetingId = this.route.snapshot.params['id'];}

  ngOnInit(): void {
    this.initForm({ meetingId: null });  
    this.getAlllocation();
      
    if (this.meetingId) {
      this.getMeetingDetailsById(this.meetingId);
      this.getAlllocation();
    }
  }

  initForm(data: any): void {
    this.bookednewmeetingForm = this.formBuilder.group({
      // Initialize 'meetingId' as null here
      meetingId: [data.meetingId],
      meetingTitle: [data.meetingTitle, Validators.required],
      startTime: [data.startTime, Validators.required],
      endTime: [data.endTime, Validators.required],
      locationId: [data.locationId, Validators.required],
      roomId: [data.roomId, Validators.required],
    });
  }

  getMeetingDetailsById(meetingId: number) {
    this.subscription.add(
      this.service.GetMeetingDetailById(meetingId).subscribe(
        (meetingDetails: any) => {          
          if (meetingDetails && meetingDetails.length > 0) {
            this.isEditMode = true;
            this.bookednewmeetingForm.patchValue({
              meetingId: meetingDetails[0].meetingId,
              meetingTitle: meetingDetails[0].meetingTitle,
              startTime: meetingDetails[0].startTime,
              endTime: meetingDetails[0].endTime,
              locationId: meetingDetails[0].locationId,
              roomId: meetingDetails[0].roomId,
            });
          } else {
            this.isEditMode = false;
          }
          this.meetingDetails = meetingDetails;
        },
        (error: any) => {
          console.error('Error fetching meeting details:', error);
        }
      )
    );
  }
  
 

  async getAlllocation() {    
    this.subscription.add(
      this.service.GetAllLocation().subscribe(data => {  
        this.locationDetails = data;
      })
    );
  }

  async getMeetingRoomByLocation(event: any) {
    const selectedLocationId = event.value;
    this.subscription.add(
      this.service.GetMettingRoomByLocation(selectedLocationId).subscribe(data => {  
        this.meetingDetails = data;
      })
    );
  }

  async bookednewmeeting() {
    if (!this.bookednewmeetingForm.valid) {
      console.error('Invalid form data. Please fill in all required fields.');
      return;
    }
  
    const roomId = this.bookednewmeetingForm.value.roomId;
    const selectedRoom = this.meetingDetails.find(room => room.roomId === roomId);
  
    if (!selectedRoom) {
      console.error('Selected room does not exist.');
      return;
    }
  
   let bookingData : Bookedmeetinglist = {
    meetingTitle: this.bookednewmeetingForm.value.meetingTitle,
    startTime: this.bookednewmeetingForm.value.startTime,
    endTime: this.bookednewmeetingForm.value.endTime,
    roomId: roomId,
    userId: 1
  } ;

    if (this.isEditMode) {
      bookingData.meetingId = this.bookednewmeetingForm.value.meetingId;
    }
  
  
    if (this.meetingId) {  
    
      // Update existing meeting
      this.subscription.add(
        this.service.updateBookedMeeting(this.meetingId, bookingData).subscribe(
          (response) => {
            
            console.log(response); // Log the response to see the details      
            this.toastr.success('Meeting updated Successfully', 'Success', { positionClass: 'toast-top-center', timeOut: 1600 });
            alert('Meeting updated Successfully');
            // this.router.navigate(['meetingroomlist']);
          },
          (error: any) => {
            if (error.status === 400 && error.error === "The meeting time conflicts with an existing booking.") {             
              this.toastr.error('The meeting time conflicts with an existing booking. Please choose a different time.', 'Error', { positionClass: 'toast-top-center', timeOut: 1600 });
            } else if (error.status === 409) {
              const errorMessage = error.error; // Get the error message from the server
              this.toastr.warning(errorMessage, 'Warning', { positionClass: 'toast-top-center', timeOut: 1600 });
            } else if (error.status === 200) {
              this.toastr.success('Meeting updated Successfully', 'Success', { positionClass: 'toast-top-center', timeOut: 1600 });
              this.router.navigate(['bookedmeetinglist']);
            } else {
              console.error('An error occurred while booking the meeting:', error);              
            }
          }
        )
      );
    } else {
      // Create new meeting
      this.subscription.add(
        this.service.saveBookednewmeetig(bookingData).subscribe(
          (response) => {
            console.log(response); // Log the response to see the details      
            this.toastr.success('Meeting booked Successfully', 'Success', { positionClass: 'toast-top-center', timeOut: 1600 });
            alert('Meeting booked Successfully');
            // this.router.navigate(['meetingroomlist']);
          },
          (error: any) => {
            if (error.status === 400 && error.error === "The meeting time conflicts with an existing booking.") {             
              this.toastr.error('The meeting time conflicts with an existing booking. Please choose a different time.', 'Error', { positionClass: 'toast-top-center', timeOut: 1600 });
            } else if (error.status === 409) {
              const errorMessage = error.error; // Get the error message from the server
              this.toastr.warning(errorMessage, 'Warning', { positionClass: 'toast-top-center', timeOut: 1600 });
            } else if (error.status === 200) {
              this.toastr.success('Meeting booked Successfully', 'Success', { positionClass: 'toast-top-center', timeOut: 1600 });
              this.router.navigate(['bookedmeetinglist']);
            } else {
              console.error('An error occurred while booking the meeting:', error);              
            }
          }
        )
      );
    }
  }
  

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks.
    this.subscription.unsubscribe();
  }
}
