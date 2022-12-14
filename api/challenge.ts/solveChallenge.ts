import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';

interface Payload {
  id: string;
  flag: string;
}

const solveChallenge = async (payload: Payload) => {
  try {
    const { data } = await api.post<{
      message: string;
      correct: boolean;
    }>('/challenge/solve', payload, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return data as { message: string; correct: boolean };
  } catch {
    Router.pathname !== '/login' && Router.push('/login');
  }
};

export default solveChallenge;
