import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  //get all quizzes
  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }

  //add a quiz
  public addQuiz(quiz){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  //delete quiz
  public deleteQuiz(id){
    return this.http.delete(`${baseUrl}/quiz/${id}`);
  }

  //get the single quiz
  public getQuiz(id){
    return this.http.get(`${baseUrl}/quiz/${id}`);
  }

  //update quiz
  public updateQuiz(quiz){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  //get all quiz by category id
  public getQuizzesOfCategory(cid){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  //get all active quiz
  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active`);
  }

  //get active quiz by category id
  public getActiveQuizzesOfCategory(cid){
    return this.http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }
}
