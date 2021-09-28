import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qId;
  questions;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;

  timer: any;
  warning =0;

  constructor(private _route: ActivatedRoute, private locationSt: LocationStrategy, private _question: QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.preventBackButton();

    this.loadQuestions();

    this.preventTabChange();


  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 60;

        this.questions.forEach(q => {
          q['givenAnswer'] = '';
        });

        console.log(this.questions);
        this.startTimer();
      },
      (error) => {
        Swal.fire("Error!", "Error in loading", "error");
        console.log(error);

      }
    )
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you really want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Confirm`,
      icon: 'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.evalQuiz();
      }
    })
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
    
  }


  getFormattedTime() {
    let min = Math.floor(this.timer / 60);
    let sec = this.timer - min * 60;
    return `${min} min : ${sec} sec`;
  }

  evalQuiz() {
    this.isSubmit = true;

    this.questions.forEach(q => {
      if (q.givenAnswer == q.answer) {
        this.correctAnswers++;
        let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
        this.marksGot += marksSingle;
      }

      if (q.givenAnswer.trim() != '') {
        this.attempted++;
      }
    });

    this.marksGot = parseFloat(Number(this.marksGot).toFixed(2));


    //call server for evaluation
    /*console.log(this.questions);
    
    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        this.marksGot = data.marksGot;
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        
      },
      (error)=>{
        console.log(error);
        
      }
    )*/
  }

  printPage() {
    window.print();
  }



  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

  //prevent tab changes
  preventTabChange(){
    document.addEventListener("visibilitychange",()=>{
      if(document.hidden){
        this.warning++;
        if(this.warning > 2){
          this.evalQuiz();
          return;
        }

        Swal.fire({
          icon: 'error',
          showConfirmButton: true,
          title: `${this.warning} of 2 warning`,
          text: "Don't switch the tab"
        })
      }
    })
  }

}
