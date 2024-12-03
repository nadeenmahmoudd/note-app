import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteData } from 'src/app/core/interfaces/note-data';
import { NotesService } from 'src/app/core/services/notes.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
constructor( public dialogRef: MatDialogRef<DialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: NoteData,
  private _notesService:NotesService){}
noteForm :FormGroup = new FormGroup({
                        // in update         in add
  title:new FormControl(this.data.title?  this.data.title:''),
  content :new FormControl(this.data.content?  this.data.content:'')
});

handleUserAction(form :FormGroup){
  console.log(form);
  if(!this.data.title && !this.data.content ){
    this.addNewNote(form.value);
  } 
  else{
    this.updateNote(form.value)
  }
  
  
 
   }
   addNewNote(newNote:NoteData){
     this._notesService.handleAddNote(newNote).subscribe({
    next:(res)=>{
      if(res.msg==="done"){
      console.log(res);
      this.dialogRef.close()
      }
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
   }
   updateNote(newNote:NoteData ){
    this._notesService.updateUserNote(newNote , this.data._id).subscribe({
      next:(res)=>{
        if(res.msg==="done"){
        console.log(res);
        this.dialogRef.close()
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
   }
}
