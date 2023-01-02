import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';

interface Payload {
  id: string;
}

const deleteNotice = async (payload: Payload) => {
  try {
    const { data } = await api.delete('/notice', {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
      data: payload,
    });
    return data;
  } catch {
    Router.pathname !== '/login' && Router.push('/login');
  }
};

export default deleteNotice;
