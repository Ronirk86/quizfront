import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qid=0;
  quiz: any;
  categories: any;
  constructor(private route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoryService,private router:Router) { }

  ngOnInit(): void {
     this.qid= this.route.snapshot.params['qid'];
     this._quiz.singleQuiz(this.qid).subscribe(
       (data: any)=>{
         this.quiz=data;
         console.log(this.quiz);
       },
       (error) =>{
         console.log(error);
       }
     );
     this._cat.categories().subscribe(
       (data: any)=>{
         this.categories=data;
       },
       (error)=>{
         alert('Error in categories loading');
       }
     );
    }
  //update form submit
  public updateForm(){
    //validate by self
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire('Success','quiz updated','success').then((e)=>{
          this.router.navigate(['/admin/quizes']);
        });
      },(error)=>{
        Swal.fire('Error','error in quiz updated','error');
        console.log(error);
      }
    );
  }
}
