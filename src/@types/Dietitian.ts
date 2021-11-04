import { Patient } from './Patient';
import { User } from './User';

export interface Dietitian extends User {
  crnNumber: string;
  cnpj: string;
  patients?: Patient[];
}
