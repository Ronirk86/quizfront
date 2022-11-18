import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SubmitresultService {

  quest:any=1;

  constructor(private _http:HttpClient) { }

  public submitResult(result:any){
    return this._http.post(`${baseUrl}/result/create`,result);
  }

  public getResult(user_id:any){
    return this._http.get(`${baseUrl}/result/get/`+user_id);
  }

  public getRank(){
    return this._http.get(`${baseUrl}/result/getAll`);
  }

  public getRankOfFirstQuestion(){
    return this._http.get(`${baseUrl}/result/getOne`);
  }

  public getRankOfSecondQuestion(){
    return this._http.get(`${baseUrl}/result/getTwo`);
  }
}
