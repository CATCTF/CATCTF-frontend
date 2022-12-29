import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';
import { User } from '../profile/dto/ProfileResDto';

const getScoreboard = async () => {
  try {
    const { data } = await api.get<User[]>('/score', {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return data;
  } catch {
    Router.pathname !== '/login' && Router.push('/login');
  }
};

export default getScoreboard;
