import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId: any;
  quizes: any;
  constructor(private _route: ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {
    this.catId=this._route.snapshot.params['catId'];
    this._route.params.subscribe((param)=>{
      this.catId=param['catId'];
      if(this.catId==0){
        console.log("Load all quiz");
        this._quiz.getActiveQuizes().subscribe(
          (data:any)=>{
            this.quizes=data;
            console.log(this.quizes);
          },
          (error)=>{
            console.log(error);
            alert('error in loading all quizes'); 
          }
        );
  
      }
      else{
        console.log("load specific quiz");
        
        this._quiz.getActiveQuizesOfCategory(this.catId).subscribe(
          (data:any)=>{
            this.quizes=data;
          },
          (error)=>{
            alert('Error in loading quiz data');
          }
        );
      }
    });
    
  }

}
