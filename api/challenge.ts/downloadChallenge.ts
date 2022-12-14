import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';

const downloadChallenge = async (fileId: string) => {
  try {
    const { data } = await api.get(`/challenge/file/${fileId}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return data;
  } catch {
    Router.pathname !== '/login' && Router.push('/login');
  }
};

export default downloadChallenge;
