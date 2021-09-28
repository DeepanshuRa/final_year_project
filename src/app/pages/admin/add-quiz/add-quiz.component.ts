import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[];

  quizData={
    title:'',
    description:'',
    maxMarks: '',
    noOfQuestions: '',
    active: true,
    category:null
  }

  constructor(private _category:CategoryService,private snack:MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        this.categories = data;
        console.log(data);
      },
      (error)=>{
        Swal.fire("Error !","Error in loading !","error");
      }
    )
  }

  //add quiz
  addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title == null){
      this.snack.open("Title is required","Ok",{
        duration: 2000
      });
      return;
    }
    if(this.quizData.category == null){
      this.snack.open("Must select category","Ok",{
        duration: 2000
      });
      return;
    }

    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire("Success","Quiz is Added successfully","success");
        console.log(data);

        this.quizData={
          title:'',
          description:'',
          maxMarks: '',
          noOfQuestions: '',
          active: true,
          category:null
        }
        
      },
      (error)=>{
        Swal.fire("Error","Something went wrong","success");
        console.log(error);
      }
    )

  }

}
