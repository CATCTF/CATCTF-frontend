import { Solve } from '../../dto/Solve';

export interface User {
  id: string;
  name: string;
  email?: string;
  password?: string;
  school?: string;
  isAdmin?: boolean;
  updatedAt?: Date;
  solves?: Solve[];
}
