import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';

interface Payload {
  name: string;
  description: string;
  category: string;
  flag: string;
  connection?: string;
  hint?: string;
}

const createChallenge = async (payload: Payload) => {
  try {
    const { data } = await api.post('/challenge', payload, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return data;
  } catch {
    Router.pathname !== '/login' && Router.push('/login');
  }
};

export default createChallenge;
