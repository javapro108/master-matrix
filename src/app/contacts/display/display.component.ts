import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

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
  displayDialog:boolean=false;
  contactForm: FormGroup;
  Subscription: Subscription;
  subRoute: Subscription;
  spContactView: SpContactViewResult;
  contactDetail: ContactDetail;
  conId: string;
  disciplines: any[];
  affiliates: any[];
  reps: any[];

  constructor(
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private contactService: ContactsService
  ) {
    this.contactDetail = {
      contact: {},
		  comments: [],
      contactActivities: [],
      marketings: [],
      jobs: [],
      projects: [],
      disciplines:[],
      affiliates:[],
      reps:[]
    };
	 }

  ngOnInit() {
    this.busy = true;
    this.Subscription = this.contactService.subscribe((data) => this.rxupdate(data));
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
        .subscribe((data) => this.getContactSuccess(data), (error) => this.getContactError(error));
    });
  }


  ngOnDestroy() {
    this.Subscription.unsubscribe();
    this.subRoute.unsubscribe();
  }


  rxupdate(data) { debugger; }

  getContactSuccess(contactDetail) {
    debugger;
    this.busy = false;
    this.contactDetail.contact = contactDetail.contact;
    this.contactDetail.projects = contactDetail.projects;
    this.contactDetail.jobs = contactDetail.jobs;
    this.contactDetail.comments = contactDetail.comments;
    this.contactDetail.marketings = contactDetail.marketings;
    this.contactDetail.disciplines = contactDetail.disciplines;
    this.contactDetail.affiliates= contactDetail.affiliates;
    this.contactDetail.reps= contactDetail.reps;
    this.affiliates= contactDetail.affiliates;
    this.reps= contactDetail.reps;

    this.disciplines = this.contactDetail.disciplines.map((discipline)=>{
        let disp = this.appService.arrayFind(this.appService.disciplines,[{name:'dispCode',value:discipline.codDisciplineID}]);
        return {
          codDisciplineID: discipline.codDisciplineID,
          name: disp? disp.dispName: ''
        }
      }
    );

    this.affiliates = this.contactDetail.affiliates.map((affiliate)=>{
      let newAffiliate:any = affiliate;

      newAffiliate.affName = this.appService.arrayFind(this.appService.affiliateOptsAll, [{name:'value', value: affiliate.cafAffialiateID}] );
      newAffiliate.affName = newAffiliate.affName? newAffiliate.affName.label : affiliate.cafAffialiateID;

      newAffiliate.stsText = this.appService.arrayFind(this.appService.affStatusOpts, [{name:'value', value: affiliate.cafStatus}] );
      newAffiliate.stsText = newAffiliate.stsText? newAffiliate.stsText.label : affiliate.cafStatus;

      newAffiliate.stsText2 = this.appService.arrayFind(this.appService.productStatusOpts, [{name:'value', value: affiliate.cafstatus2}] );
      newAffiliate.stsText2 = newAffiliate.stsText2? newAffiliate.stsText2.label : affiliate.cafstatus2;

      return newAffiliate;
    });

    this.reps = this.contactDetail.reps.map((rep)=>{
      let newRep: any = rep;

      newRep.repName = this.appService.arrayFind(this.appService.repOpts, [{name:'value', value: rep.corRepID}] );
      newRep.repName = newRep.repName? newRep.repName.label : rep.corRepID;

      newRep.affName = this.appService.arrayFind(this.appService.affiliateOptsAll, [{name:'value', value: rep.corAffialiateID}] );
      newRep.affName = newRep.affName? newRep.affName.label : rep.corAffialiateID;

      newRep.stsText = this.appService.arrayFind(this.appService.repStatusOpts, [{name:'value', value: rep.corStatus}] );
      newRep.stsText = newRep.stsText? newRep.stsText.label : rep.corStatus;

      return newRep;
    });

    let distName = this.appService.arrayFind(this.appService.districts, [{name:'value', value: this.contactDetail.contact.comDistrict}] );
    this.contactDetail.contact.comDistrict = distName? distName.label : this.contactDetail.contact.comDistrict;

  }

  getContactError(error) {
    this.busy = false;
    if (error.status == 401) {
      this.location.back();
      this.appService.pushData({type:"SHOW-LOGIN"});
    } else {
    }
  }

  changeContact(contact) {
    this.router.navigate(['../../change', this.conId], { relativeTo: this.activeRoute });
  }

  saveComments(cmdPriority,cmdComment){
    debugger;
    this.displayDialog = false;
    let comment = {
      cocContactID: this.conId,
      cmdPriority: cmdPriority,
      cmdComment: cmdComment
    }
    this.contactService.addComment(comment)
        .subscribe(data => this.successAddComment(data), error => this.errorAddComment(error));
  }

  successAddComment(comment){
    comment.cmdPriority = comment.cmdPriority == true? '!':'';
    this.contactDetail.comments.unshift(comment);
    this.contactDetail.comments = this.contactDetail.comments.slice();
  }

  errorAddComment(error){

  }

}
