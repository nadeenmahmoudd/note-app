import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/user-data';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userToken:BehaviorSubject<any>=new BehaviorSubject(null)
  constructor(private _httpClient:HttpClient) {
    this.setUserToken();
   }
  setUserToken(){
    let token =localStorage.getItem('token');
    if(token!== null){
this.userToken.next(token)
    }
  }

  handleSignUp(userInfo:UserData):Observable<any>{
    return this._httpClient.post(environment.baseUrl+'signUp' , userInfo)
  }

  handleSignIn(userInfo:UserData):Observable<any>{
   return this._httpClient.post(environment.baseUrl+'signIn', userInfo)
  }
}
function setUserToken() {
  throw new Error('Function not implemented.');
}

