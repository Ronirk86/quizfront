import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public quizes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }

  //add quiz
  public addQuiz(quiz: any){
     return this.http.post(`${baseUrl}/quiz/`,quiz)
  }

  //delete quiz
  public deleteQuiz(qid: any){
    return this.http.delete(`${baseUrl}/quiz/${qid}`)
  }

  //get the single quiz
  public singleQuiz(qid: any){
    return this.http.get(`${baseUrl}/quiz/${qid}`);
  }

  //update quiz
  public updateQuiz(quiz: any){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  //get quizes of category
  public getQuizesOfCategory(cid:any){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  //get active quizes
  public getActiveQuizes(){
    return this.http.get(`${baseUrl}/quiz/active`);
  }

  //get active quizes of category
  public getActiveQuizesOfCategory(cid:any){
    return this.http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }
}
