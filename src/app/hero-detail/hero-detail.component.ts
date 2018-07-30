import { Component, OnInit, Input } from '@angular/core';
/* we included Input in the imports in order to be able to use the @Input decoration */
/* so that this component can receive objects as input from other components */
import {Hero} from '../hero';   /* so that object type Hero is available to this component */
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;      /* hero Property of this component will be received through the @Input annotation */
                            /*so we're not gonna give it a value of our own */

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.grabAHero();
  }

  saveHero(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

  grabAHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');   // + converts string from URL to number
    this.heroService.getAndSendOneHero(id)
      .subscribe(grabbedHero => this.hero = grabbedHero);
  }

  goBack(): void {
    this.location.back();
  }
}
