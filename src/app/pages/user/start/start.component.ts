import { LocationStrategy, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionserviceService } from 'src/app/services/questionservice.service';
import { SubmitresultService } from 'src/app/services/submitresult.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid:any;
  questions:any;
  marksGot:any=0;
  correctAnswer=0;
  attempted=0;

  //isSubmit=false;

  timer:any;

  timeTakenByUser:any;

  isShow=false;


  result:any={
    qrId:0,
    marksGot:0,
    correctAnswer:0,
    attempted:0,
    uId:0,
    timeTakenByUser:0,
    quest:0,
  }

  user:any;

  constructor(
    private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    public _question:QuestionserviceService,
    private _resultService:SubmitresultService,
    private _login:LoginService,
    private _router:Router
    ) { }

  ngOnInit(): void {
   this.user=this._login.getUser();
   console.log("user========================"+this.user);
   console.log("user id========================"+this.user.id);
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions();
  }
  
 loadQuestions(){
   this._question
   .getQuestionOneByOne()
   .subscribe(
     (data:any)=>{
       console.log(data);
       this.questions=data;
       this.timer=this.questions.length * 0.5 * 60;
       this.questions.forEach((q:any) => {
         q['givenAnswer']='';
       });
       console.log(this.questions);
       this.startTimer();
     },
     (error)=>{
       console.log(error);
       Swal.fire('Error','Error in loading Questions of quiz','error');
     }
   );
 }

  preventBackButton(){
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    });
  }

  submitQuiz(){
    Swal.fire({
      title:'Do you want to submit quiz',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: 'Dont Submit',
      icon: 'info'
  }).then((result)=>{
    //this.isSubmit=true;
    if(result.isConfirmed){
      this.evalQuiz();
      //changes try 04-niv-2022
     // this._router.navigate(['/start/']);
     // this.ngOnInit();
    }
  });
    
}

//for auto submit after time completion
 startTimer(){
  let t= window.setInterval(()=>{
     //code
     if(this.timer <= 0){
      // this.evalQuiz();
       clearInterval(t);
     }else{
       this.timer--;
     }
   },1000)
 }

  getFormatedtime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer - mm * 60;
    return `${mm} min: ${ss} sec` ;
  }

  evalQuiz(){
    //this.isSubmit=true;
    //calculation
    console.log(this.questions);
    this.questions.forEach((q: { givenAnswer: any; answer: any; })=>{
      if(q.givenAnswer==q.answer){
         console.log("correct answer");
         this.correctAnswer++;
         let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
         this.marksGot+=parseFloat(Number(marksSingle).toFixed(2));
         this.timeTakenByUser = 30-this.timer;
      }
      if(q.givenAnswer.trim()!=''){
        this.attempted++;
      }
    });
    console.log("Correct Answers "+this.correctAnswer);
    console.log("Marks got "+this.marksGot);
    console.log(this.questions);
    console.log("attempted:"+this.attempted);
    
    let count=10;
    this.result.qr_id=count++;
    this.result.marksGot=this.marksGot;
    this.result.correctAnswer=this.correctAnswer;
    this.result.attempted=this.attempted;
    this.result.uId=this.user.id;
    this.result.timeTakenByUser=this.timeTakenByUser;
    this.result.quest=this._resultService.quest;
    this._resultService.quest++
    if(this._resultService.quest==3){
      this._resultService.quest=0;
    }
    console.log("??????????????"+this.result.uId);
    
    this.submitResult();
  }

  printPage(){
    window.print();
  }


  submitResult(){ 
    
    console.log("time taken========="+this.timeTakenByUser);
      this._resultService.submitResult(this.result).subscribe(
         (data:any)=>{
           console.log(data);
           //logic to refresh
           if(this._question.count==2){
            
            this._question.isSubmit=true;
            this.reloadComponent();
            this._question.count=0;
           }
           else{
            this.reloadComponent();
            this._question.count++;
            console.log("count++++"+this._question.count);
           }
           
         },
         (error:any)=>{
           console.log(error);
           Swal.fire('Wrong Answer!');
         }
      );
  }
  
  reloadComponent() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['/start']);
  }
 
}
