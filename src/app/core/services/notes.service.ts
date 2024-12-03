import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteData } from '../interfaces/note-data';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private _httpClient: HttpClient) {}
  handleAddNote(newNote: NoteData): Observable<any> {
    return this._httpClient.post(environment.noteUrl, newNote, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }

  getUserNotes(): Observable<any> {
    return this._httpClient.get(environment.noteUrl, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }

  deleteUserNote(noteId: string, noteIndex: number): Observable<any> {
    return this._httpClient.delete(`${environment.noteUrl}${noteId}`, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }
  updateUserNote(newNote: NoteData ,noteId:string):Observable<any>{
return this._httpClient.put(`${environment.noteUrl}${noteId}`,newNote, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }
}
