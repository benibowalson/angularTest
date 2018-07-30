import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';      /* to be able to simulate an observable */
/* the of() function simulates the gettingof data */
import {MessageService} from './message.service';   /* so we can INJECT the messageService here; OR "subscribe to the messageService" */
import {HttpClient, HttpHeaders} from '@angular/common/http'; // http library
import {catchError, map, tap} from 'rxjs/operators';          // to catch and pipe errors

const httpOptions = {         // place constants before @ Injectable decorator
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  /* constructor() { } */
  /* Subscribe to (or INJECT) within constructor to messageService */
  // constructor(private messageService: MessageService) {}
  constructor(
    private objHttp: HttpClient, // INJECTING HttpClient and MessageService (subscribing to services)
    private messageService: MessageService) {}

  /*
  presentMyHeroes(): Hero[] {
    return HEROES;
  }
  */
 private heroesURL = 'api/heroes';

  /*Observable: For Async Data Loading */
 presentMyHeroes(): Observable<Hero[]> {  /* emit a single value; Array of Hero Objects */
  // Now we want the message service to do something too
    this.messageService.addMessage('HeroService: fetched heroes');
    // return of (HEROES);  /* the of() function simulates the getting of data */
   return this.objHttp.get<Hero[]>(this.heroesURL)
    .pipe(tap(
        heroes => this.logMessage('fetched heroes')
    ), catchError(this.handleTheError('presentMyHeros', [])));
   /* with HttpClient, we would do HttpClient.get<Hero[]> which returns an Observable<Hero[]> */
 }

 getAndSendOneHero(id: number): Observable<Hero> {
   const url = `${this.heroesURL}/${id}`;
   // this.messageService.addMessage(`HeroService: fetched hero with id=${id}`);
   // return of(HEROES.find(aHero => aHero.id === id));
   return this.objHttp.get<Hero>(url).pipe(tap(
     _ => this.logMessage(`fetched hero id = ${id}`)
   ), catchError(this.handleTheError<Hero>(`getAndSendOneHero id=${id}`)));
 }

 private logMessage(aMsg: string) {
   this.messageService.addMessage(`HeroService: ${aMsg}`);
 }

 updateHero(aHero: Hero) {
   return this.objHttp.put(this.heroesURL, aHero, httpOptions)
   .pipe(tap(_ => this.logMessage(`update Hero with id = ${aHero.id}`)),
     catchError(this.handleTheError<any>('updateHero')));
 }

 addAHero(aHero: Hero): Observable<Hero> {
   return this.objHttp.post<Hero>(this.heroesURL, aHero, httpOptions)
   .pipe(
     tap((xHero: Hero) => this.logMessage(`added a hero w/ id = ${xHero.id}`)),
     catchError(this.handleTheError<Hero>('addAHero'))
   );
 }

 deleteAHero(aHero: Hero | number): Observable<Hero> {
   const id = typeof aHero === 'number' ? aHero : aHero.id;
   const url = `${this.heroesURL}/${id}`;

   return this.objHttp.delete<Hero>(url, httpOptions).pipe(
     tap(_ => this.logMessage(`deleted hero id = ${id}`)),
     catchError(this.handleTheError<Hero>('deleteAHero'))
   );
 }

 searchForHeroes(aStr: string): Observable<Hero[]> {
   if (!aStr.trim()) {
     return of([]);
   }

   return this.objHttp.get<Hero[]>(`${this.heroesURL}/?name=${aStr}`).pipe(
     tap(_ => this.logMessage(`found heroes matching "${aStr}"`)),
     catchError(this.handleTheError<Hero[]>('searchForHeroes', []))
   );
 }

 private handleTheError<T> (operation = 'operation', result?: T) {
   return (anError: any): Observable<T> => {
     console.error(anError);        // log to console
     this.logMessage(`${operation} failed: ${anError.message}`);
     return of(result as T);
   };
 }
}
