import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';

interface Payload {
  title: string;
  content: string;
}

const createNotice = async (payload: Payload) => {
  try {
    const { data } = await api.post('/notice', payload, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return data;
  } catch {
    Router.pathname !== '/login' && Router.push('/login');
  }
};

export default createNotice;
