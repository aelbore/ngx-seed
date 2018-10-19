import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ReadmeService {

  constructor(private http: HttpClient) { }
  
  private handleError(error: HttpErrorResponse) {
    return throwError({
      status: error.status,
      message: error.message
    });
  }

  getReadme(username: string, repo: string): Observable<string> {
    const README_URL = `https://raw.githubusercontent.com/${username}/${repo}/master/README.md`;
    return this.http.get(README_URL, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

}