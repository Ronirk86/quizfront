import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SetimeService {

  constructor(
    private _http:HttpClient
  ) { }

  public setTimer(setTime:any){
       return this._http.post(`${baseUrl}/timer/set`,setTime);
  }

  public getTimer(){
    return this._http.get(`${baseUrl}/timer/get`);
  }
}
