import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';

const uploadChallengeFile = async (formData: FormData) => {
  try {
    const { data } = await api.post('/challenge/file', formData, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch {
    Router.pathname !== '/login' && Router.push('/login');
  }
};

export default uploadChallengeFile;
