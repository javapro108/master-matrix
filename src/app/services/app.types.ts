export interface GlobalObject {
  busy?: boolean;
}

export interface User {
  userName?: string,
  firstName?: string,
  lastName?: string,
  department?: string,
  email?: string
  token?: string
}

export interface AppMessage {
  type?: string,
  message?: string,
  objType?: string,
  objID?: string,
  time?: Date
}

export interface DropDownOption {
  value: string;
  label: string;
}

export interface NameValue {
  name: any,
  value: any
}
