import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';

const downloadFile = async (fileId: string) => {
  try {
    const { data } = await api.get(`/challenge/file/${fileId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    const blob = new Blob([data.file], { type: data.mimetype });
    return blob;
  } catch {
    Router.pathname !== '/login' && Router.push('/login');
  }
};

export default downloadFile;
