import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
/*import {HEROES} from '../mock-heroes'; */     /*//No longer this import since service will be used now */
import {HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  /*hero = 'Okodokas I';      /* Use single quotes, not double*/
  /*
  hero: Hero = {
    id: 1,
    name: 'Okodokas I'
  };
  */

  heroes: Hero[];

  selectedHero: Hero;         /* property of type Hero; the Hero class already created */

  /*constructor() { } */                    /*no longer using default constructor */
  constructor(private heroService: HeroService) { }      /* HeroService injection now implied; subscribing to hero service */


  // respondToHeroClick(aHero: Hero): void {   /*a method taking a hero object and returning void */
  //  this.selectedHero = aHero;
  // }

  loadMyHeroes(): void {
     /* Before: presentMyHeroes() method is in the HeroService Class */
    /*this.heroes = this.heroService.presentMyHeroes(); Synchronous*/
    /********************** */
    /**Now: Asynchronous by subscribing to data service */
    this.heroService.presentMyHeroes()
      .subscribe(receivedHeroes => this.heroes = receivedHeroes); // receivedHeroes is sent by heroService.presentMyHeroes()
  }

  saveAHero(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addAHero({ name } as Hero)
      .subscribe(aHero => {
        this.heroes.push(aHero);
      });
  }

  ngOnInit() {
    this.loadMyHeroes();
  }
}
