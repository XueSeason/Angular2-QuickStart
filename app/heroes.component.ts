// Component 修饰符告诉 Angular 使用什么模板和如何创建组件
import {Component} from 'angular2/core';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroListComponent} from './hero-list.component';
import {HeroService} from './hero.service';
import {Hero} from './hero';

import {HighLightDirective} from './highlight.directive';

// 参数为 metadata 对象
@Component({
  // 在 HTML 中遇到 my-app 标签，Angular 将创建并展示 AppComponent 实例
  selector: 'my-heroes',
  // 模板特指组件相关的模板，告诉 Angular 如何去渲染组件视图
  // 双花括号表示从组件中读取 title 和 hero 的属性并且渲染视图
  // 单向数据绑定的一种形式
  // template: '<h1>{{title}}</h1><h2>{{hero}} details!</h2>'

  // <input value="{{hero.name}}" placeholder="name">

  // 使用 ngModel 内建指令进行双向数据绑定
  // [()] = BANANA IN A BOX 箱子里的香蕉
  // template: `
  //   <h1>{{title}}</h1>
  //   <h2>{{hero.name}} details!</h2>
  //   <div><label>id: </label>{{hero.id}}</div>
  //   <div>
  //     <label>name: </label>
  //     <input [(ngModel)]="hero.name" placeholder="name">
  //   </div>
  //   `

  /* 使用 *ngFor 内建指令迭代
     * 表示 li 标签及其子标签构成一个主模板
     ngFor 指令迭代 heroes 数组属性
     # 前缀表示 hero 被作为本地模板的变量，我们可以在这个模板中获取 hero 对象的属性
  */
  /* 注意 (click)="onSelect(hero)"
    括号内的 click 表示将 li 标签内的 click 事件作为目标，
    等号右边的表达式会调用 AppComponent 里的 onSelect 方法
    传入本地模板变量 hero 作为参数
  */
  /* 注意 li 中的 [class.selected]="hero === selectedHero"
     属性绑定的语法
     数据流从数据源（等号右边的表达式）传给 class 的属性
  */
  /* input 属性
     [hero]="selectedHero"
  */
  template: `
    <h2 [myHighlight]="null" [defaultColor]="'violet'">My Heros</h2>
    <my-hero-list [heroes]="heroes"></my-hero-list>
  `,
  // directives 数组，使模板可以识别 my-hero-detail 标签，即 HeroDetailComponent 的选择器
  directives: [HeroDetailComponent, HeroListComponent, HighLightDirective],
})
// 通过模板操控视图的外观和行为
export class HeroesComponent {
  public heroes: Hero[];

  constructor(private _heroService: HeroService) { }

  getHeroes() {
    // this._heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
    // this.heroes = this._heroService.getHeroes();
  }

  // 生命周期
  ngOnInit() {
    this.getHeroes();
  }
}

/* 展示数据 displaying data
最简单的方法就是通过interpolation方式插值。{{属性名}}
当属性的值被改变时，Angular 会自动更新视图。
准确地说，是所有视图相关的异步事件完成后才进行更新视图。
*/
