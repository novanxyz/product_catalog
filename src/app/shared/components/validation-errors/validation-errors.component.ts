import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl,  } from '@angular/forms';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationErrorsComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() control: FormControl;

  constructor() {}

  ngOnInit() {
    console.log("validation-errors", this.name, this.control);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("validation-errors", changes);
  }

}
