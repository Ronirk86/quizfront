import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit {

  quizes:any=[
    
  ]

  constructor(private quiz:QuizService) { }

  ngOnInit(): void {
     this.quiz.quizes().subscribe(
       (data:any)=>{
         this.quizes=data;
         console.log(this.quizes)
       },
       (error)=>{
         console.log(error);
         Swal.fire('Error !','Error in loading !', 'error');
       }
     );
  }

  //delet quiz
  deleteQuiz(qid: any){
    Swal.fire(
      {
      icon:'info',
      title:"Are you sure ?",
      confirmButtonText: 'Delete',
      showCancelButton: true,
      }).then((result)=>{
        if(result.isConfirmed){
          //delete
          this.quiz.deleteQuiz(qid).subscribe(
            (data:any)=>{
              this.quizes=this.quizes.filter((quiz: any) => quiz.qid!=qid);
              Swal.fire('Success','Quiz deleted','success')
              
            },
            (error)=>{
              Swal.fire('Error','Error in deleting quiz','error')
            }
          );
        }
      });
  }

}
