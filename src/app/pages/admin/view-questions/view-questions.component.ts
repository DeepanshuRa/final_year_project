import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  qId;
  qTitle;

  questions = [];

  constructor(private _route: ActivatedRoute, private _question: QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;

    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;

      },
      (error) => {
        console.log(error);

      }
    )
  }

  deleteQuestion(id) {
    Swal.fire({
      icon: 'info',
      confirmButtonText: 'Delete',
      showCancelButton: true,
      title: "Are you sure, want ro delete this question?"
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(id).subscribe(
          (data: any) => {
            this.questions = this.questions.filter(q => q.questionId != id);
          },
          (error) => {
            Swal.fire("Error!", "Something went wrong", "error");
            console.log(error);

          }
        )
      }
    })
  }

}
