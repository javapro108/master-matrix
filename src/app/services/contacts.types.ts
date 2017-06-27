export interface FindParams {
  conName?: String;
  conInactive?: Boolean;
  conActive?: Boolean;
}

export interface Affiliate {
  cafAffialiateID?: string;
  cafContactID?: string;
  cafStatus?: string;
  cafstatus2?: string;
}

export interface Discipline {
  codContactID?: string;
  codDisciplineID?: string;
}


export interface Rep {
  corRepID?: string;
  corAffialiateID?: string;
  corContactID?: string;
  corStatus?: string;
  corLastContact?: string;
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
  conBirthday?: string;
  conAnniversary?: string;
  conGuestName?: string;
  conHomeAddress?: string;
  conHomeAddress2?: string;
  conHomeCity?: string;
  conHomeState?: string;
  conHomeZip?: string;
  conHomePhone?: string;
  conHomeFax?: string;
  conHomeEmail?: string;
  conRevisedDate?: string;
  conRevisedBy?: string;
  conInactive?: boolean;
  conOldCompID?: string;
  conOldID?: string;
  conDate?: string;
  conCreatedBy?: string;
  conAssistEmail?: string;
}

export interface FindResult {
  conID?: String;
	conFName?: String;
	conLName?: String;
	conAlias?: String;
	conPosition?: String;
	conTitle?: String;
	conDirectPhone?: String
	conEmail?: String;
	comDistrict?: String;
	comName?: String;
	comPhone?: String;
	actDate?: String;
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
