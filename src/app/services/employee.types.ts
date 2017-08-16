export interface TblEmployees {
    empUserName?: string;
    empName?: string;
    empTitle?: string;
    empExt?: string;
    empDept?: string;
    empRep?: boolean;
    empInactive?: boolean;
    empPassword?: string;
    empEmail?: string;
    empMgr?: string;
    conid?: string;
    empAllAccess?: boolean;
    mode?: string;
    deptName?: string;
    managerName?: string;
    contactName?: string;
}

export interface TblEmpRoles {
    emrRolID?: string;
    emrEmpUserName?: string;
    mode?: string;
    roleName?: string;
}

export interface TblEmpAffiliates {
    emaEmpUserName?: string;
    emaAffID?: string;
    mode?: string;
    affName?: string;
}

export interface TblEmpDistricts {
    emdEmpUserName?: string;
    emdDisID?: string;
    mode?: string;
    distName?: string;
}
export interface EmployeeEntity {
    employee: TblEmployees;
    empRoles: TblEmpRoles[];
    empAffiliates: TblEmpAffiliates[];
    empDistricts: TblEmpDistricts[];
}