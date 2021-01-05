import tippy, { Instance, Props, Content } from 'tippy.js';
import {autoinject, bindable, bindingMode} from 'aurelia-framework';

@autoinject()
export class TippyCustomAttribute {
  @bindable({ defaultBindingMode: bindingMode.toView, primaryProperty: true }) private options: Content | Props;

  private tippyInstance: Instance<Props>;
  constructor(private element: Element) {}

  private optionsChanged(newValue: Content | Props) {
    if(!this.tippyInstance) return;

    if(this.isContent(newValue))
    {
    this.tippyInstance.setContent(newValue);
    }
    else
    {
      this.tippyInstance.setProps(newValue);
    }
  }

  private attached() {
    const options = this.isContent(this.options) ?
      {
        content: this.options,
        allowHTML: true
      } : this.options;

    this.tippyInstance = tippy(this.element, options);
  }
  
  private detached() {
    this.tippyInstance.destroy();
  }

  private isContent(possibleContent: Content | Props) : possibleContent is Content
  {
    return ["string", "function"].includes(typeof possibleContent) || this.isElement(possibleContent);
  }
  
  private isElement(value: unknown): value is Element | DocumentFragment {
    return ['Element', 'Fragment'].some((type) => this.isType(value, type));
  }

  private isType(value: unknown, type: string): boolean {
    const str = {}.toString.call(value);
    return str.indexOf('[object') === 0 && str.indexOf(`${type}]`) > -1;
  }
}
