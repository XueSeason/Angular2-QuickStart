import {Component, Input, OnInit} from 'angular2/core';
import {Hero} from './hero';

import {Router} from 'angular2/router';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-hero-list',
  template: `
  <ul class="heroes">
    <li *ngFor="#hero of heroes"
      (click)="onSelect(hero)"
      [class.selected]="hero === selectedHero"
    >
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </li>
  </ul>
  <div *ngIf="selectedHero">
    <h2>
      {{selectedHero.name | uppercase}} is my hero
    </h2>
    <button (click)="gotoDetail()">View Details</button>
  </div>
  `,

  // 为组件添加样式
  // 该样式只作用于当前标签，不会污染全局
  styleUrls: ['app/hero-list.component.css']
})

export class HeroListComponent implements OnInit {
  @Input()
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private _router: Router,
    private _heroService: HeroService
  ) {}

  onSelect(hero: Hero) {
    console.log(this.selectedHero);
    this.selectedHero = hero;
  }

  getHeroes() {
    this._heroService.getHeroes()
      .then(heroes => this.heroes = heroes)
  }

  ngOnInit() {
    this.getHeroes();
  }

  gotoDetail() {
    this._router.navigate(['HeroDetail', {id: this.selectedHero.id}]);
  }
}
