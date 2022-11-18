import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  users:any=[];

  constructor(
    private _users:UserService
  ) { }

  ngOnInit(): void {
       this.getAlluser();
  }

  getAlluser(){
    this._users.getAllUser().subscribe(
      (data)=>{
         console.log(data);
         this.users=data;
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error in loading data');
      }
    );
  }

}


