import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface GitHubUserRepo {
  id: number;
  name: string;
  description: string;
}

@Injectable()
export class SearchService {

  constructor(private router: Router, private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    return throwError({
      status: error.status,
      message: error.message});
  }

  getRepos(username: string): Observable<any[]> {
    return this.http
      .get<any[]>(`https://api.github.com/users/${username}/repos`)
      .pipe(
        catchError(this.handleError)
      );
  }

}