import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SearchService } from './search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ]
})
export class SearchComponent { 

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  pageSizeOptions: number[] = [5, 10, 20];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  
  loading = false;
  message = null;
  duration = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private searchService: SearchService) { }

  onChange(e: CustomEvent) {
    of(e.detail.value)
      .pipe(
        debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        text.length ? this.getRepos(text) : this.reset()
      });
  }

  reset() {
    this.dataSource.data = [];
  }

  getRepos(username: string) {
    this.loading = true;
    this.dataSource.paginator = this.paginator;
    this.searchService
      .getRepos(username)
      .subscribe(
        data => this.dataSource.data = data,
        error => this.showError(error.message),
        () => this.loading = false
      );
  }

  viewReadme(repo: string) {    
    const [ username,  repository ] = repo.split('/');
    this.router.navigate(['readme', username, repository]);
  }

  showError(error: string) {
    this.message = {
      severity: 'error',
      summary: 'Error',
      detail: error
    };
    this.duration = 3000;
    this.loading = false;
  }

}