import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription'

import { AppService } from '../../services/app.service';
import { ContactsService } from '../../services/contacts.service';
import { ContactDetail, ContactEntity, SpContactViewResult} from '../../services/contacts.types';

@Component({
  selector: 'display-contacts-view',
  templateUrl: './display.component.html'
})
export class DisplayComponent implements OnInit, OnDestroy {

  busy: boolean = true;
  //displayDialog:boolean=false;
  contactForm: FormGroup;
  Subscription: Subscription;
  subRoute: Subscription;
  spContactView: SpContactViewResult;
  contactDetail: ContactDetail;
  conId: string;

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private contactService: ContactsService) {
    this.contactDetail = {
      contact: {},
		  comments: [],
      contactActivities: [],
      marketings: [],
      jobs: [],
      projects: []
    };
	 }

  ngOnInit() {
    debugger;
    this.busy = true;
    this.Subscription = this.contactService.subscribe((data) => this.rxupdate(data));
    this.buildForm();
    this.subRoute = this.activeRoute.params.subscribe((params) => {
      this.conId = params.id;
      let getParams = {
        conID: params.id,
        getContactDetail: true,
        getComments: true,
        getJobs: true,
        getProjects: true,
        getMarketing: true,
        getStatus: true,
        getActivities: false,
        getDiscipline: true
      }
      this.contactService.getContactDetails(getParams)
        .subscribe((data) => this.contactReceived(data));
    });
  }


  ngOnDestroy() {
    this.Subscription.unsubscribe();
    this.subRoute.unsubscribe();
  }


  rxupdate(data) { debugger; }

  contactReceived(contactDetail) {
    debugger;
    this.busy = false;
    this.contactDetail.contact = contactDetail.contact;
    this.contactDetail.projects = contactDetail.projects;
    this.contactDetail.jobs= contactDetail.jobs;

    this.setContactFormValue(this.contactDetail.contact)


  }

  changeContact(contact) {
    this.router.navigate(['../../change', this.conId], { relativeTo: this.activeRoute });
  }


  buildForm(): void {
    this.contactForm = this.formBuilder.group({
      conName: '',
      conFName: '',
      conMI: '',
      cLName: '',
      conAlias: '',
      conCourtesy: '',
      conTitle: '',
      conAssistantName: '',
      conAssistPhone: '',
      conAssistExt: '',
      conExt: '',
      conDirectPhone: '',
      conCellPhone: '',
      conFaxNum: '',
      conEmail: '',
      conRevisedDate: '',
      conRevisedBy: '',
      comPhone: '',
      posPosition: '',
      comName: '',
      comAddress: '',
      comAddress2: '',
      comCity: '',
      comState: '',
      comZip: '',
      comCountry: '',
      comFax: '',
      comTollFree: '',
      comWeb: '',
      comDeliveryAddress1: '',
      comDeliveryAddress2: '',
      comDeliveryCity: '',
      comDeliveryState: '',
      comDeliveryZip: '',
      comDeliveryCountry: '',
      comDeliveryDirections: '',
      comMailAddress1: '',
      comMailAddress2: '',
      comMailCity: '',
      comMailState: '',
      comMailZip: '',
      comMailCountry: '',
      comDirectionComments: '',
      conHomeAddress: '',
      conHomeAddress2: '',
      conHomeCity: '',
      conHomeState: '',
      conHomeZip: '',
      conHomePhone: '',
      conHomeEmail: '',
      conHomeFax: '',
      conBirthday: '',
      conAnniversary: '',
      conGuestName: '',
      comDirections: '',
      comID: '',
      comDistrict: '',
      terName: '',
      conInactive: '',
      conCompanyID: '',
      conDate: '',
      conCreatedBy: '',
      conAssistEmail: ''
    });
  }

  setContactFormValue(spContactTable: SpContactViewResult) {
    let contactFormValue = {
      conName: '',
      conFName: '',
      conMI: '',
      cLName: '',
      conAlias: '',
      conCourtesy: '',
      conTitle: '',
      conAssistantName: '',
      conAssistPhone: '',
      conAssistExt: '',
      conExt: '',
      conDirectPhone: '',
      conCellPhone: '',
      conFaxNum: '',
      conEmail: '',
      conRevisedDate: '',
      conRevisedBy: '',
      comPhone: '',
      posPosition: '',
      comName: '',
      comAddress: '',
      comAddress2: '',
      comCity: '',
      comState: '',
      comZip: '',
      comCountry: '',
      comFax: '',
      comTollFree: '',
      comWeb: '',
      comDeliveryAddress1: '',
      comDeliveryAddress2: '',
      comDeliveryCity: '',
      comDeliveryState: '',
      comDeliveryZip: '',
      comDeliveryCountry: '',
      comDeliveryDirections: '',
      comMailAddress1: '',
      comMailAddress2: '',
      comMailCity: '',
      comMailState: '',
      comMailZip: '',
      comMailCountry: '',
      comDirectionComments: '',
      conHomeAddress: '',
      conHomeAddress2: '',
      conHomeCity: '',
      conHomeState: '',
      conHomeZip: '',
      conHomePhone: '',
      conHomeEmail: '',
      conHomeFax: '',
      conBirthday: '',
      conAnniversary: '',
      conGuestName: '',
      comDirections: '',
      comID: '',
      comDistrict: '',
      terName: '',
      conInactive: '',
      conCompanyID: '',
      conDate: '',
      conCreatedBy: '',
      conAssistEmail: ''
    }
    Object.keys(contactFormValue).forEach(function(key) {
      if (spContactTable[key] != undefined) {
        contactFormValue[key] = spContactTable[key];
      }
    });

    this.contactForm.setValue(contactFormValue);
  }

}
