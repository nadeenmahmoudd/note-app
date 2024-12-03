import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
apiError:string='';
isLoading:boolean=false;
  constructor(private _authService:AuthService, private _router:Router ){}
registerForm :FormGroup=new FormGroup({
  name: new FormControl('',[Validators.required , Validators.minLength(3)]),
  email: new FormControl('',[Validators.required ,Validators.email]),
  password: new FormControl('' ,[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,12}$/)]), 
  phone: new FormControl('',[Validators.required , Validators.pattern(/^(01)[0-2|5][0-9]{8}$/)]),
  age: new FormControl('', [Validators.required]),
})
handleRegister(form:FormGroup){
  // console.log(form);
  this.isLoading=true;
  this._authService.handleSignUp(this.registerForm.value).subscribe({
    next:(res)=>{
      console.log(res);
    if(res.msg === "done"){
      this._router.navigate(['signIn']); 
      this.isLoading=false
    }
    },
    error:(err)=>{
      console.log(err);
      this.apiError=err.error.msg
      this.isLoading=false
    }
  })
}
}
