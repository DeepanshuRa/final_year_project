import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }


  //get questions of a quiz
  public getQuestionsOfQuiz(id){
    return this.http.get(`${baseUrl}/question/quiz/all/${id}`);
  }

  //get questions of a quiz
  public getQuestionsOfQuizForTest(id){
    return this.http.get(`${baseUrl}/question/quiz/${id}`);
  }

  //add a question
  public addQuestion(question){
    return this.http.post(`${baseUrl}/question/`,question);
  }

  //delete question
  public deleteQuestion(id){
    return this.http.delete(`${baseUrl}/question/${id}`);
  }

  //eval quiz
  public evalQuiz(questions){
    return this.http.post(`${baseUrl}/question/eval-quiz`,questions);
  }
}
