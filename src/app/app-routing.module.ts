import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { NotesComponent } from './pages/notes/notes.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'signIn' , pathMatch:'full'},
  {path:'signUp', component:SignupComponent , title:'Sign Up'},
  {path:'signIn', component:SigninComponent , title:'Sign In'},
  {path:'notes',canActivate:[authGuard] ,component:NotesComponent , title:'your Notes'},
  {path:'**', component:NotfoundComponent , title:'Not Found'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
