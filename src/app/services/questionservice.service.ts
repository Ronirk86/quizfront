import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionserviceService {

  count:any=0;
  isSubmit=false;
  constructor(
    private _http:HttpClient
  ) { }

  public getQuestionsOfQuiz(qid: any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionsOfQuizForTest(qid: any){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //add question
  public addQuestion(question: any){
    return this._http.post(`${baseUrl}/question/`,question); 
      
  }

  //delete question

  public deleteQuestion(qid: any){
    return this._http.delete(`${baseUrl}/question/${qid}`);

  }
 
  //get quest one by one
  public getQuestionOneByOne(){
    return this._http.get(`${baseUrl}/question/get/`);
  }
}
