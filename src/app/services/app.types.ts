export interface User {
  userName?:String,
  firstName?:String,
  lastName?:String,
  department?:String,
  email?:String
}

export interface AppMessage {
  type?: string,
  message?: string,
  objType?: string,
  objID?:string,
  time?:Date
}

export interface DropDownOption {
  value: string;
  label: string;
}

export interface NameValue {
  name:any,
  value:any
}
