import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';
import { ChallengesResDto } from './dto/ChallengeResDto';

const getChallenge = async () => {
  try {
    const { data } = await api.get<ChallengesResDto>('/challenge', {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return data;
  } catch {
    Router.pathname !== '/login' && Router.push('/login');
  }
};

export default getChallenge;
