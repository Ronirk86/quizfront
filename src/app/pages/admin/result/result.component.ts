import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubmitresultService } from 'src/app/services/submitresult.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  users:any=[];

  quizResult:any;

  id:any;

  constructor(
    private _users:UserService,
    private _result:SubmitresultService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params['id'];
    console.log("user id==========================="+this.id);
       this.getResult();
  }

  // getAlluser(){
  //   this._users.getAllUser().subscribe(
  //     (data)=>{
  //        console.log(data);
  //        this.users=data;
  //        this.quizResult=this.users[1].quizResult
  //        console.log(this.quizResult);
  //     },
  //     (error)=>{
  //       console.log(error);
  //       Swal.fire('Error in loading data');
  //     }
  //   );
  // }

  getResult(){
      this._result.getResult(this.id).subscribe(
              (data:any)=>{
                this.quizResult=data;
                console.log("result data=========="+data);
              },
              (error)=>{
                console.log(error);
                Swal.fire('Error in loading');
              }
      );
  }
}
