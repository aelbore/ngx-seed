import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface GitHubUserRepo {
  id: number;
  name: string;
  description: string;
}

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    return throwError({
      status: error.status,
      message: 'Something went wrong. please try again later.'});
  }

  getRepos(username: string): Observable<any[]> {
    return this.http
      .get<GitHubUserRepo[]>(`/api/repos`)
      .pipe(
        catchError(this.handleError)
      );
  }

}