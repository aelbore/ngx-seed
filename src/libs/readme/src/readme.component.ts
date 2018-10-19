import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReadmeService } from './readme.service';

import 'marked';
declare const marked: any;

@Component({
  selector: 'readme',
  template: '<ng-content></ng-content>'
})
export class ReadMeComponent implements AfterViewInit {

  constructor(private readmeService: ReadmeService,  
    private route: ActivatedRoute, 
    private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      const ngxHeader: any = document.body.querySelector('ngx-toolbar');
      ngxHeader.header = params.repo;
      this.getReadmeContent(params.username, params.repo);
    });
  }

  getReadmeContent(username: string, repo: string) {
    this.readmeService.getReadme(username, repo)
      .subscribe(data => {
        this.elementRef.nativeElement.innerHTML = marked(data);
      });
  }

}