import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { SetimeService } from 'src/app/services/setime.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid:any;
  quiz:any;

  timer:any;

  i:any=0;

  constructor(private _route:ActivatedRoute,
    private _quiz:QuizService,
    private router:Router,
    private setTimeService:SetimeService
    
    ) { }

  ngOnInit(): void {
    this.getTimer();
    this.startTimer();
    this.qid=this._route.snapshot.params['qid'];
    this._quiz.singleQuiz(this.qid).subscribe(
      (data:any)=>{
        console.log(data);
        this.quiz=data;
      },
      (error)=>{
        console.log(error);
        alert('Error in loading quiz data')
      }
    );
  }

   startQuiz(){
      Swal.fire({
          title:'Do you want to start quiz',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Start',
          denyButtonText: 'Dont Start',

      }).then((result)=>{
        if(result.isConfirmed){
          this.router.navigate(['/start/']);
        }
        else if(result.isDenied){
          Swal.fire('Try Next Time');
        }
      })
   }

   getFormatedtime(){
    let mm=Math.floor(this.timer.timer/60);
    let ss=this.timer.timer - mm * 60;
    return `${mm} min: ${ss} sec` ;
  }

   startTimer(){
    let t= window.setInterval(()=>{
       //code
       if(this.timer.timer <= 0){
        this.router.navigate(['/start/'+this.qid]);
         clearInterval(t);
       }else{
         this.timer.timer--;
       }
     },1000)
   }
   
   getTimer(){
     this.setTimeService.getTimer().subscribe(
       (data)=>{
         this.timer=data;
         console.log("timer===="+this.timer);

       }
     );
   }

}
