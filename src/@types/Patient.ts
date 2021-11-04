import { Dietitian } from './Dietitian';
import { User } from './User';

export interface Patient extends User {
  cpf: string;
  dietitian: Dietitian;
}
