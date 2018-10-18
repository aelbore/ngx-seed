import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { SearchService } from '.tmp/search/src/search.service';
import { GitHubUserRepo } from './search.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ]
})
export class SearchComponent implements OnInit { 

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.getRepos('');
  }

  onChange(e: CustomEvent) {
    of(e.detail.value)
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        console.log(text);
      });
  }

  getRepos(username: string) {
    this.searchService
      .getRepos(username)
      .subscribe(
        data => this.dataSource.data = data,
        error => console.log(error),
        () => console.log('Hide the spinner.')
      );
  }

}