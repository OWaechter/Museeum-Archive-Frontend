import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Object } from '../objects/object';
import { ObjectService } from '../objects/object.service';

@Component({
  selector: 'app-object-search',
  templateUrl: './object-search.component.html',
  styleUrls: [ './object-search.component.css' ]
})
export class ObjectSearchComponent implements OnInit {
  objects$!: Observable<Object[]>;
  private searchTerms = new Subject<string>();

  constructor(private objectService: ObjectService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.objects$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.objectService.searchObjects(term)),
    );
  }
}