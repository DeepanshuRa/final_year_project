import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //set token in localstorage
  public loginUser(token:any){
    localStorage.setItem("token",token);
    return true;
  }

  //user is logged in or not
  public isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token == undefined || token == '' || token == null){
      return false;
    }else{
      return true;
    }
  }

  //remove token from local storage

  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //fetch token from local storage
  public getToken(){
    return localStorage.getItem("token");
  }

  //set userdetails in local storage
  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));
  }

  //fetch userdetails from local storage
  public getUser(){
    let user =  localStorage.getItem("user");
    if(user!=null){
      return JSON.parse(user);
    }else{
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  
}
