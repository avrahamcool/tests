import {autoinject, bindable, bindingMode} from "aurelia-framework";
import flatpickr from "flatpickr";
import {Instance} from "flatpickr/dist/types/instance";
import {Hebrew} from "flatpickr/dist/l10n/he";

@autoinject()
export class FlatpickrCustomAttribute
{
  @bindable({defaultBindingMode: bindingMode.twoWay, primaryProperty: true}) private dateValue: Date;

  private element: HTMLInputElement;
  private flatpickrInstance: Instance;

  constructor(element: Element)
  {
    if (!(element instanceof HTMLInputElement))
    {
      throw new Error(`flatpickr CustomAttribute can ony be used on <input> you used it on <${element.tagName}>`);
    }

    this.element = element;
  }

  private attached()
  {
    this.flatpickrInstance = flatpickr(this.element,
      {
        locale: Hebrew,
        dateFormat: "d/m/Y",
        allowInput: false,
        defaultDate: this.dateValue,
        onChange: (selectedDates, dateStr, instance) =>
        {
          const selectedDate = selectedDates?.[0];
          if (selectedDate?.getTime() !== this.dateValue?.getTime())
          {
            this.dateValue = selectedDate;
            selectedDate && instance.close();
          }
        }
      });
  }
  private detached()
  {
    this.flatpickrInstance.destroy();
  }
  private dateValueChanged(newValue: Date): void
  {
    this.flatpickrInstance?.setDate(newValue);
  }
}
