export interface affiliates {
  cafAffialiateID?: string;
  cafContactID?: string;
  cafStatus?: string;
  cafstatus2?: string;
}

export interface disciplines {
  codContactID?: string;
  codDisciplineID?: string;
}


export interface reps {
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
