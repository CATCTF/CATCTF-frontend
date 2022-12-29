import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';

const getChallenge = async () => {
  try {
    const { data } = await api.get('/challennge', {
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
