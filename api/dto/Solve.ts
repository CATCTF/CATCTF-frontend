import { Challenge } from '../challenge.ts/dto/ChallengeResDto';
import { User } from '../profile/ProfileResDto';

export interface Solve {
  id?: string;
  createAt: Date;
  user?: User;
  challenge?: Challenge;
}
