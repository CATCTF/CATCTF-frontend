import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';
import { User } from './dto/ProfileResDto';

const getProfile = async () => {
  try {
    const { data } = await api.get<User>('/profile', {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return data;
  } catch {
    Router.pathname !== '/login' && Router.push('/login');
  }
};

export default getProfile;
