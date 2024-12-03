import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  constructor(private _router :Router){}

signOut(){
  localStorage.removeItem('token');
  console.log("clear");
  this._router.navigate(['signIn'])
}

  
}
