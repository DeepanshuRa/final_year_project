import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories = [];

  constructor(private _category:CategoryService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        this.categories = data;
        console.log(data);
      },
      (error)=>{
        this.snack.open("Error!!","Ok",{
          duration: 2000
        });

        console.log(error);
        
      }
    )
  }

  deleteCategory(id){
    this._category.deleteCategory(id).subscribe(
      (data:any)=>{
        Swal.fire("Success","Successfully Deleted","success");
        this.categories = this.categories.filter(c=> c.cid != id);
      },
      (error)=>{
        Swal.fire("Error!","Something went wrong","error");
        console.log(error);
        
      }
    )
  }

}
