import { Challenge } from '../challenge.ts/dto/ChallengeResDto';
import { User } from '../profile/dto/ProfileResDto';

export interface Solve {
  id?: string;
  createdAt: Date;
  user?: User;
  challenge?: Challenge;
}
