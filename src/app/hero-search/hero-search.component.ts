import { Component, OnInit } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {Hero} from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;      // heroes$: declared as an observable
  private searchStrings = new Subject<string>();

  constructor(private heroService: HeroService) { }

  // Push a search string into the observable stream
  doSearch(aSearchString: string): void {
    this.searchStrings.next(aSearchString);
  }

  ngOnInit() {
    this.heroes$ = this.searchStrings.pipe(
      // wait 300ms after each keystroke before considering ther term
      debounceTime(300),
      // ignore new search string if same as previous string
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((xString: string) => this.heroService.searchForHeroes(xString)),
    );
  }

}
