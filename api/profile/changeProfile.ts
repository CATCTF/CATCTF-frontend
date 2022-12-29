import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';
import { User } from './dto/ProfileResDto';

interface Payload {
  name?: string;
  password?: string;
  newPassword?: string;
  school?: string;
}
const getProfile = async (payload: Payload) => {
  try {
    const { data } = await api.put<User>('/profile', payload, {
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
