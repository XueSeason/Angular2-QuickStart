// bootstrap 方法，具有平台特殊性
// bootstrap 不是从 core 导入，而是从 platform/browser 导入
// 不同类型的 bootstrap 方法来自不同的库
import { bootstrap } from 'angular2/platform/browser';
// 应用的根组件
import { AppComponent } from './app.component';

bootstrap(AppComponent);

/* Angular 是如何创建实例？
注意 @Component 修饰器中指定的 my-app 标签中的CSS 选择器。
在 index.html 中，我们添加了 my-app 标签。
当 AppComponent 作为 bootstrap 的参数，Angular 就会查找 index.html 中的 my-app 标签。
如果找到，就实例化一个 AppComponent 类，然后渲染 my-app 标签
*/
