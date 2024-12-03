import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  apiError:string='';
  isLoading:boolean=false;
  constructor( private _authService:AuthService , private _router:Router){}

signInForm: FormGroup= new FormGroup({
  email: new FormControl('',[Validators.required ,Validators.email]),
  password: new FormControl('' ,[Validators.required]), 
})

handleLogin(form:FormGroup){
  this.isLoading=true
  this._authService.handleSignIn(this.signInForm.value).subscribe({
  
    next:(res)=>{
      console.log(res);
      this.isLoading=false
      this._authService.setUserToken()
      localStorage.setItem('token','3b8ny__'+res.token)
      if(res.msg === "done"){
        this._router.navigate(['notes']);
      }
    },
    error:(err)=>{
      console.log(err);
      this.isLoading=false;
      this.apiError=err.error.msg
    }
  })
}

}

