import { Component } from 'angular2/core';
import { HeroService } from './hero.service';
import { HeroesComponent} from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent } from './dashboard.component';

// routing
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
  selector: 'my-app',
  // 模板底部添加 <router-outlet> 标记位置
  // RouterOutlet 是 ROUTER_DIRECTIVES 的一个指令
  // 我们将一个数组绑定到 routerLink 上来告诉 router 如何导航
  template: `
  <h1>{{title}}</h1>
  <nav>
    <a [routerLink]="['Dashboard']">Dashboard</a>
    <a [routerLink]="['Heroes']">Heroes</a>
  </nav>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  // 注册 HeroService provider
  // 当创建一个 AppComponent 实例时，创建一个全新的 HeroService
  // AppComponent 及其子组件能够通过这个服务获取 heroes
  // 子组件不必再次注册同样的 provider，否则会隐藏父级的 provider
  providers: [HeroService, ROUTER_PROVIDERS],
})
@RouteConfig([{
    // 浏览器地址匹配的 url 路径
    path: '/heroes',
    // 大写开头的官方路径名
    name: 'Heroes',
    // 需要展示的组件
    component: HeroesComponent
  }, {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    // 当浏览器路径不匹配时使用该默认组件
    useAsDefault: true
  }, {
    path: 'detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  }
])
export class AppComponent {
  public title = 'Tour of Heros';
}
