import { BaseType } from './BaseType';

export enum STATUS {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

export interface User extends BaseType {
  email: string;
  password: string;
  name: string;
  birthDate?: Date;
  phoneNumber: string;
  status?: STATUS;
}
