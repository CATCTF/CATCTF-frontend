import { Solve } from '../../dto/Solve';

export interface User {
  point?: number;
  solved?: number;
  id: string;
  name: string;
  email?: string;
  password?: string;
  school?: string;
  isAdmin?: boolean;
  updatedAt?: Date;
  solves?: Solve[];
}
