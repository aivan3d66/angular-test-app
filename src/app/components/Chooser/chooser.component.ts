import {Component, forwardRef, Input} from "@angular/core";
import {CurrenciesType} from "../../data.service";
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'chooser-comp',
  styleUrls: ['chooser.component.css'],
  templateUrl: 'chooser.component.html',
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Chooser), multi: true}
  ]
})

export class Chooser implements ControlValueAccessor {
  @Input() currencies: Array<CurrenciesType> = [];
  @Input() currentCurrency: string = "";
  @Input() title: string = "";
  @Input() value: string = "";

  chooserForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.chooserForm = fb.group({
      amount: [''],
      currency: [''],
    });
  }

  writeValue(value: any): void {
    if (value) {
      this.chooserForm.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.chooserForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
  }
}

