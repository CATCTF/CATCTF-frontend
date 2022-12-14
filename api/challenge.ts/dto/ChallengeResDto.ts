import { Solve } from '../../dto/Solve';

export interface File {
  id?: string;
  name?: string;
  mimetype?: string;
}

export interface Challenge {
  id?: string;
  name?: string;
  description?: string;
  flag?: string;
  category?: string;
  point?: number;
  solve?: number;
  hint?: string;
  connection?: string;
  show?: boolean;
  updatedAt?: Date;
  solves?: Solve[];
  file?: File;
}

export interface ChallengesResDto {
  challenges: Challenge[];
  total: number;
  categories: string[];
  solves: string[];
}

export interface ChallengeResDto {
  id: string;
  name: string;
  category: string;
}
