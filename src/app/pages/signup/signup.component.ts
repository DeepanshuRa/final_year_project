import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private snack: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.user.username=='' || this.user.username == null){
      this.snack.open("Username is required","Ok",{
        duration: 3000,
        verticalPosition: 'top'
      })
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data)=>{
        console.log(data);
        swal.fire('Success',"User is registered successfully","success");
        
      },(error)=>{
        console.log(error);
        this.snack.open("something went wrong!","Ok",{
          duration: 1000
        })
      }
    );
    
  }

}
