// 使用 ElementRef 注入指令的构造器中来获取 DOM 元素
import {Directive, ElementRef, Input} from 'angular2/core';

@Directive({
  // 建议选择器的命名加上前缀，防止和 HTML 中的标准元素造成冲突。
  // 不要使用 ng 前缀的指令，这只属于 Angular 框架，否则会造成混乱
  selector: '[myHighlight]',
  // host 属性引用 DOM 元素
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})

export class HighLightDirective {
  // 数据流是从绑定的表达式流到当前指令，需要用 Input 修饰
  @Input('myHighlight') highlightColor: string;

  // 此时我们不能再使用 myHighlight，因为已经被占用了。
  // 但是请记住组件也是一个指令！
  // 我们可以在组件模板中添加大量需要的组件属性
  @Input() set defaultColor(colorName: string) {
    this._defaultColor = colorName || this._defaultColor;
  }

  private _defaultColor = 'red';

  private _highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  onMouseEnter() {
    this._highlight(this.highlightColor || this._defaultColor);
  }

  onMouseLeave() {
    this._highlight(null);
  }

  constructor(private el: ElementRef) {
    // ElementRef 通过 nativeElement 属性可以直接获取 DOM 元素
    // el.nativeElement.style.backgroundColor = 'gray';
  }
}

/*
指令类型
1.组件
2.结构指令
3.属性指令

组件是一个拥有模板的指令，也是三种指令中最普遍的。
结构指令通过添加删除 DOM 元素来改变 DOM 布局。例如 NgFor 和 NgIf。
属性指令改变元素的的外观。例如内建的 NgStyle 属性可以改变元素的样式。
*/
