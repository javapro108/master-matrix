import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactDetail } from '../../services/contacts.types';

@Component({
  selector: 'general-contacts-view',
  templateUrl: './general.component.html'
})
export class GeneralComponent {

	@Input() contactDetail : ContactDetail;
  @Input() busy : boolean;

}
