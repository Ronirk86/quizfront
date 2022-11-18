import { Component, OnInit } from '@angular/core';
import { SubmitresultService } from 'src/app/services/submitresult.service';

@Component({
  selector: 'app-viewrank',
  templateUrl: './viewrank.component.html',
  styleUrls: ['./viewrank.component.css']
})
export class ViewrankComponent implements OnInit {

  results:any;

  question:any;

  constructor(
    private _result:SubmitresultService
  ) { }

  ngOnInit(): void {
    this.getRank();
  }

  getRank(){
    this.question="All";
    this._result.getRank().subscribe(
      (data:any)=>{
         this.results=data;
         console.log("rankk============="+this.results);
      },
      (error)=>{
         console.log(error);
      }
    );
  }

  getRankOfFirstQuestion(){
    this.question="FIRST"
    this._result.getRankOfFirstQuestion().subscribe(
      (data:any)=>{
         this.results=data;
         console.log("rankk============="+this.results);
      },
      (error)=>{
         console.log(error);
      }
    );
  }

  getRankOfSecondQuestion(){
    this.question="SECOND";
    this._result.getRankOfSecondQuestion().subscribe(
      (data:any)=>{
         this.results=data;
         console.log("rankk============="+this.results);
      },
      (error)=>{
         console.log(error);
      }
    );
  }

}
