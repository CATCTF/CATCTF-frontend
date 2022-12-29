import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';

const uploadChallengeFile = async (file: File, id: string) => {
  try {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('file', file);
    const { data } = await api.post('/challenge', formData, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return data;
  } catch {
    Router.pathname !== '/login' && Router.push('/login');
  }
};

export default uploadChallengeFile;
