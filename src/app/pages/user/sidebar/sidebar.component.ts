import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories;

  constructor(private _category: CategoryService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        this.categories = data;
      },
      (error)=>{
        console.log(error);
        this.snack.open("Error in loading","Ok",{
          duration: 3000
        })
      }
    )
  }

}
