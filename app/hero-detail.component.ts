import {Component, Input, OnInit} from 'angular2/core';
import {Hero} from './hero';

import { RouteParams } from 'angular2/router';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  template: `
  <div *ngIf="hero">
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
    <button (click)="goBack()">Back</button>
  </div>
  `,
  styleUrls: ['app/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  // 声明为一个 input 属性，才可以进行属性绑定
  @Input()
  public hero: Hero;

  constructor(
    private _heroService: HeroService,
    private _routeParams: RouteParams
  ) { }

  ngOnInit() {
    // 字符串转换为数字
    let id = +this._routeParams.get('id');
    this._heroService.getHero(id)
      .then(hero => this.hero = hero);
  }

  goBack() {
    window.history.back();
  }
}
