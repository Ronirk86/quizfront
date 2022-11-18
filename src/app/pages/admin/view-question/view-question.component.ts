import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionserviceService } from 'src/app/services/questionservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private _question:QuestionserviceService,
    private _snack:MatSnackBar
    ) { }
  
  qid:any;
  title:any;
  questions:any=[];
  ngOnInit(): void {
     this.qid=this.route.snapshot.params['qid'];
     this.title=this.route.snapshot.params['title'];
     this._question.getQuestionsOfQuiz(this.qid).subscribe(
       (data:any)=>{
         console.log(data);
         this.questions=data;
       },
       (error)=>{
         console.log(error);
       }
     );
  
  }

  //delete question
  public deleteQuestion(questId: any){
    Swal.fire(
      {
      icon:'info',
      title:"Are you sure ?",
      confirmButtonText: 'Delete',
      showCancelButton: true,
      }).then((result)=>{
        if(result.isConfirmed){
          //delete
          this._question.deleteQuestion(questId).subscribe(
            (data:any)=>{
              this.questions=this.questions.filter((q: any) => q.questId!=questId);
              Swal.fire('Success','Question deleted','success')
              
            },
            (error)=>{
              Swal.fire('Error','Error in deleting Question','error')
              console.log(error);
            }
          );
        }
      });
  }

}
