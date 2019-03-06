import { Component, OnInit, Input,ChangeDetectionStrategy } from '@angular/core';
import { FormControl,  } from '@angular/forms';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationErrorsComponent implements OnInit {
  @Input() errorPrefix: string;
  @Input() control: FormControl;

  constructor() {}

  ngOnInit() {
    console.log(this.control);
  }

}
