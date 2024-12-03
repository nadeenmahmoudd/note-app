import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { NoteData } from 'src/app/core/interfaces/note-data';
import { NotesService } from 'src/app/core/services/notes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  constructor(public dialog: MatDialog, public _notesService: NotesService) {}
  allNotes: NoteData[] = [];
  searchValue:string=''
  ngOnInit(): void {
    this.showNote();
  }
  openDialog(noteData?:NoteData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data:{title:noteData?.title , content:noteData?.content , _id:noteData?._id}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.showNote();
    });
  }
  showNote() {
    this._notesService.getUserNotes().subscribe({
      next: (res) => {
        if (res.msg === 'done') {
          console.log(res);
          this.allNotes = res.notes;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteNote(noteId: string, noteIndex: number) {
    console.log(noteId, noteIndex);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        }).then(() => {
          this._notesService.deleteUserNote(noteId, noteIndex).subscribe({
            next: (res) => {
              if (res.msg === 'done') {
                console.log(res);
                this.showNote();
                this.allNotes.splice(noteIndex, 1);
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
        });
      }
    });
  }
  updateNote(noteDetails:NoteData , noteIndex:number){
console.log(noteDetails , noteIndex);
this.openDialog({title:noteDetails.title , content:noteDetails.content , _id:noteDetails._id})
  }
}
