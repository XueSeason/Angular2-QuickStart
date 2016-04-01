import {Injectable} from 'angular2/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';

@Injectable()
export class HeroService {
  getHeroes() {
    // Promise 异步获取数据
    return Promise.resolve(HEROES);
    // return HEROES;
  }

  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }

  getHero(id) {
    return Promise.resolve(HEROES).then(
      heroes => heroes.filter(hero => hero.id === id)[0]
    );
  }
}

/* 不要使用 new 创建 HeroService 实例
我们的组件知道该如何去创建 HeroService，如果改变了 HeroService 的构造函数，必须修复所有创建实例的地方。
如果 service 需要 cache 并且需要分享 cache，我们就不能这么做。
难以实现场景转换
*/
