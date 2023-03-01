import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) { }

  getTournamentData(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/matches/");
  }

  postTournamentData(data: Match): Observable<any> {
    return this.http.post<any>("http://localhost:3000/matches/", data);
  }

  deleteTournamentData(id: number): Observable<any> {
    return this.http.delete<any>("http://localhost:3000/matches/"+id);
  }
}