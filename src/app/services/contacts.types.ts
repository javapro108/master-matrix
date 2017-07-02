export interface FindParams {
  conName?:string ;
  conInactive?: boolean;
  conActive?: boolean;
}

export interface Affiliate {
  cafAffialiateID?: string;
  cafContactID?: string;
  cafStatus?: string;
  cafstatus2?: string;
  mode?:string;
}

export interface Discipline {
  codContactID?: string;
  codDisciplineID?: string;
  mode?:string;
}


export interface Rep {
  corRepID?: string;
  corAffialiateID?: string;
  corContactID?: string;
  corStatus?: string;
  corLastContact?: string;
  mode?:string;
}

export interface TblContactComments {
  cocID?: string;
  cocContactID?: string;
  cocDate?: string;
  cocUser?: string;
  cmdComment?: string;
  cmdPriority?: boolean;
}

export interface TblContacts {
  conID?: string;
  conCompanyID?: string;
  conCourtesy?: string;
  conFName?: string;
  conMI?: string;
  conLName?: string;
  conTitle?: string;
  conIM?: string;
  conAlias?: string;
  conAssistantName?: string;
  conAssistPhone?: string;
  conAssistExt?: string;
  conDirectPhone?: string;
  conExt?: string;
  conCellPhone?: string;
  conFaxNum?: string;
  conEmail?: string;
  conPosition?: string;
  conBirthday?: Date;
  conAnniversary?: Date;
  conGuestName?: string;
  conHomeAddress?: string;
  conHomeAddress2?: string;
  conHomeCity?: string;
  conHomeState?: string;
  conHomeZip?: string;
  conHomePhone?: string;
  conHomeFax?: string;
  conHomeEmail?: string;
  conRevisedDate?: Date;
  conRevisedBy?: string;
  conInactive?: boolean;
  conOldCompID?: string;
  conOldID?: string;
  conDate?: Date;
  conCreatedBy?: string;
  conAssistEmail?: string;
}
  export interface FindResult {
  conID?:string ;
  conFName?:string;
  conLName?:string ;
  conAlias?:string;
  conPosition?:string ;
  conTitle?:string;
  conDirectPhone?:string;
  conEmail?:string;
  comDistrict?:string;
  comName?: string;
  comPhone?:string;
  actDate?: string;
}

export interface ContactEntity {
  contact?: TblContacts,
  comments?: Array<TblContactComments>,
  disciplines?: Array<Discipline>,
  affiliates?: Array<Affiliate>,
  reps?: Array<Rep>,
  findParams?: FindParams,
  findResults?: Array<FindResult>
}



export interface SpContactViewResult {

  conName?: string;
  conFName?: string;
  conMI?: string;
  cLName?: string;
  conAlias?: string;
  conCourtesy?: string;
  conTitle?: string;
  conAssistantName?: string;
  conAssistPhone?: string;
  conAssistExt?: string;
  conExt?: string;
  conDirectPhone?: string;
  conCellPhone?: string;
  conFaxNum?: string;
  conEmail?: string;
  conRevisedDate?: string;
  conRevisedBy?: string;
  comPhone?: string;
  posPosition?: string;
  comName?: string;
  comAddress?: string;
  comAddress2?: string;
  comCity?: string;
  comState?: string;
  comZip?: string;
  comCountry?: string;
  comFax?: string;
  comTollFree?: string;
  comWeb?: string;
  comDeliveryAddress1?: string;
  comDeliveryAddress2?: string;
  comDeliveryCity?: string;
  comDeliveryState?: string;
  comDeliveryZip?: string;
  comDeliveryCountry?: string;
  comDeliveryDirections?: string;
  comMailAddress1?: string;
  comMailAddress2?: string;
  comMailCity?: string;
  comMailState?: string;
  comMailZip?: string;
  comMailCountry?: string;
  comDirectionComments?: string;
  conHomeAddress?: string;
  conHomeAddress2?: string;
  conHomeCity?: string;
  conHomeState?: string;
  conHomeZip?: string;
  conHomePhone?: string;
  conHomeEmail?: string;
  conHomeFax?: string;
  conBirthday?: string;
  conAnniversary?: string;
  conGuestName?: string;
  comDirections?: string;
  comID?: string;
  comDistrict?: string;
  terName?: string;
  conInactive?: boolean;
  conCompanyID?: string;
  conDate?: string;
  conCreatedBy?: string;
  conAssistEmail?: string;
}

export interface SpContactViewResult {
  conName?: string;
  conFName?: string;
  conMI?: string;
  cLName?: string;
  conAlias?: string;
  conCourtesy?: string;
  conTitle?: string;
  conAssistantName?: string;
  conAssistPhone?: string;
  conAssistExt?: string;
  conExt?: string;
  conDirectPhone?: string;
  conCellPhone?: string;
  conFaxNum?: string;
  conEmail?: string;
  conRevisedDate?: string;
  conRevisedBy?: string;
  comPhone?: string;
  posPosition?: string;
  comName?: string;
  comAddress?: string;
  comAddress2?: string;
  comCity?: string;
  comState?: string;
  comZip?: string;
  comCountry?: string;
  comFax?: string;
  comTollFree?: string;
  comWeb?: string;
  comDeliveryAddress1?: string;
  comDeliveryAddress2?: string;
  comDeliveryCity?: string;
  comDeliveryState?: string;
  comDeliveryZip?: string;
  comDeliveryCountry?: string;
  comDeliveryDirections?: string;
  comMailAddress1?: string;
  comMailAddress2?: string;
  comMailCity?: string;
  comMailState?: string;
  comMailZip?: string;
  comMailCountry?: string;
  comDirectionComments?: string;
  conHomeAddress?: string;
  conHomeAddress2?: string;
  conHomeCity?: string;
  conHomeState?: string;
  conHomeZip?: string;
  conHomePhone?: string;
  conHomeEmail?: string;
  conHomeFax?: string;
  conBirthday?: string;
  conAnniversary?: string;
  conGuestName?: string;
  comDirections?: string;
  comID?: string;
  comDistrict?: string;
  terName?: string;
  conInactive?: boolean;
  conCompanyID?: string;
  conDate?: string;
  conCreatedBy?: string;
  conAssistEmail?: string;
}

export interface ContactDetail {
  contact?: SpContactViewResult;
  comments: any;
  contactActivities: any;
  marketings: any;
  jobs: any;
  projects: any;
}
