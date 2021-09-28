import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route: ActivatedRoute,private _quiz:QuizService,private _category:CategoryService,
    private snack:MatSnackBar,
    private _router:Router) { }

  qId = 0;
  quiz;
  categories = []

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;

    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz = data;
      },
      (error)=>{
        console.log(error);
        
      }
    );

    this._category.categories().subscribe(
      (data:any)=>{
        this.categories = data;
      },
      (error)=>{
        console.log(error);
        
      }
    )

  }


  //update quiz
  updateData(){
    if(this.quiz.title.trim()=='' || this.quiz.title == null){
      this.snack.open("Title is required","Ok",{
        duration: 2000
      });
      return;
    }

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire("Success","Quiz is updated successfully","success").then((e)=>{
          this._router.navigate(["/admin/quizzes"]);
        });
      },
      (error)=>{
        Swal.fire("Error !","Something went wrong","error");
        console.log(error);
        
      }
    )
  }

}
