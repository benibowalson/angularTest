import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';      /* to be able to simulate an observable */
/* the of() function simulates the gettingof data */
import {MessageService} from './message.service';   /* so we can INJECT the messageService here; OR "subscribe to the messageService" */

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  /* constructor() { } */
  /* Subscribe to (or INJECT) within constructor to messageService */
  constructor(private messageService: MessageService) {}

  /*
  presentMyHeroes(): Hero[] {
    return HEROES;
  }
  */

  /*Observable: For Async Data Loading */
 presentMyHeroes(): Observable<Hero[]> {  /* emit a single value; Array of Hero Objects */
  // Now we want the message service to do something too
    this.messageService.addMessage('HeroService: fetched heroes');
    return of (HEROES);  /* the of() function simulates the getting of data */
   /* with HttpClient, we would do HttpClient.get<Hero[]> which returns an Observable<Hero[]> */
 }

 getAndSendOneHero(id: number): Observable<Hero> {
   this.messageService.addMessage(`HeroService: fetched hero with id=${id}`);
   return of(HEROES.find(aHero => aHero.id === id));
 }
}
