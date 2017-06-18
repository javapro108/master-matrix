import { TblContacts } from './contacts.types';

export interface TblCompany {
  comAddress?: string;
  comAddress2?: string;
  comAlias?: string;
  comCity?: string;
  comCountry?: string;
  comCreatedBy?: string;
  comDate?: string;
  comDeliveryAddress1?: string;
  comDeliveryAddress2?: string;
  comDeliveryCity?: string;
  comDeliveryCountry?: string;
  comDeliveryDirections?: string;
  comDeliveryState?: string;
  comDeliveryZip?: string;
  comDirectionComments?: string;
  comDirections?: string;
  comDistrict?: string;
  comFax?: string;
  comID?: string;
  comInactive?: boolean;
  comMailAddress1?: string;
  comMailAddress2?: string;
  comMailCity?: string;
  comMailCountry?: string;
  comMailState?: string;
  comMailZip?: string;
  comName?: string;
  comOldID?: string;
  comPhone?: string;
  comRevisedBy?: string;
  comRevisedDate?: string;
  comSolomonID?: string;
  comState?: string;
  comTollFree?: string;
  comWeb?: string;
  comZip?: string;
}

export interface TblCompanyComment {
  cmcComment?: string;
  cmcCompanyID?: string;
  cmcDate?: string;
  cmcID?: string;
  cmcPriority?: Boolean;
  cmcUser?: string;
}


export interface FindParams {
  comName?: string;
  comInactive?: Boolean;
}

export interface FindCompanyResult {
  comID?: string;
  comName?: string;
  comAlias?: string;
  comCity?: string;
  comState?: string;
}

export interface CompanyEntity {
  company?: TblCompany;
  comments?: Array<TblCompanyComment>;
  contacts?: Array<TblContacts>;
  findParams?: FindParams;
  findCompanyResults?: Array<FindCompanyResult>;
}
