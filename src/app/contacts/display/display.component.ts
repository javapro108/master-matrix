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
  displayDialog:boolean=false;
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
      projects: [],
      disciplines:[],
      affiliates:[],
      reps:[]
    };
	 }

  ngOnInit() {
    debugger;
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
    this.contactDetail.jobs = contactDetail.jobs;
    this.contactDetail.comments = contactDetail.comments;
    this.contactDetail.disciplines= contactDetail.disciplines;
    this.contactDetail.affiliates= contactDetail.affiliates;
    this.contactDetail.reps= contactDetail.reps;

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
