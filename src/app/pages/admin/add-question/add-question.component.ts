import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionserviceService } from 'src/app/services/questionservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  
  qid: any;
  title: any;
  question={
    quiz:{
      qid:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };
  constructor(
    private _http:ActivatedRoute,
    private _question:QuestionserviceService
  ) { }

  ngOnInit(): void {
    this.qid=this._http.snapshot.params['qid'];
    this.title=this._http.snapshot.params['title'];
    this.question.quiz.qid=this.qid;
  }

  formSubmit(){
    if(this.question.content.trim()=='' || this.question.content.trim()==null){
      return;
    }

    if(this.question.option1.trim()=='' || this.question.option1.trim()==null){
      return;
    }
    if(this.question.option2.trim()=='' || this.question.option2.trim()==null){
      return;
    }
    if(this.question.answer.trim()=='' || this.question.answer.trim()==null){
      return;
    }

    //form submit
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success','Question Added','success');
        this.question={
          quiz:{
            qid:''
          },
          content:'',
          option1:'',
          option2:'',
          option3:'',
          option4:'',
          answer:'',
        };
      },
      (error)=>{
        Swal.fire('Error','Error in adding','error');
      }
    );
  }
}
