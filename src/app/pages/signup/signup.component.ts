import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService,private snack: MatSnackBar,private login:LoginService,private http:Router) { }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }

  public loginData={
    username:'Ujjawal012',
    password:'pqr'
  }

  ngOnInit(): void {
  }
   
  

  

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null) {
      this.snack.open('user name is required!!','',{
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      }
      );
      return;
    }
    //add user
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
           localStorage.setItem('token',data.token);
           this.userService.addUser(this.user).subscribe(
            (data: any) => {
              console.log(data);
              Swal.fire('Success', data.username+' is registered','success')
              this.http.navigate(['/login']);
            },
            (error) => {
              console.log(error);
              this.snack.open('something went wrong!!','',{
                duration: 3000,
                verticalPosition: 'top'
              }
              );
            }
            
          );
      },
      (error)=>{
        Swal.fire('Error','error in generating token','error');
      }
      

    );

  }
  

}
