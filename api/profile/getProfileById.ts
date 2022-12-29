import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';
import { User } from './dto/ProfileResDto';

const getProfileById = async (id: string) => {
  try {
    const { data } = await api.get<User>(`/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return data;
  } catch {
    Router.pathname !== '/login' && Router.push('/login');
  }
};

export default getProfileById;
