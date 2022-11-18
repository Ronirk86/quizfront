import { Component, OnInit } from '@angular/core';
import { SetimeService } from 'src/app/services/setime.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-set-time',
  templateUrl: './set-time.component.html',
  styleUrls: ['./set-time.component.css']
})
export class SetTimeComponent implements OnInit {

  timer:any={
    timer:'',
  }

  constructor(
    private setTimeService:SetimeService
  ) { }

  ngOnInit(): void {
    
  }

   setTimer(){
     this.setTimeService.setTimer(this.timer).subscribe(
       (data)=>{
          console.log(data);
          Swal.fire('Time set for quiz by admin');
       },
       (error)=>{
          console.log(error);
          Swal.fire('Error in submitting data');
       }
     );
   }

   getTimer(){
     this.setTimeService.getTimer().subscribe(
        (data)=>{
          console.log("timer===="+data);
        },
        (error)=>{
          console.log(error);
        }
     );
   }



}
