import { getCookie } from 'cookies-next';
import api from '..';

const hello = async (): Promise<{
  isAdmin: boolean;
} | null> => {
  try {
    const { data } = await api.get('/auth', {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return data;
  } catch {
    return null;
  }
};

export default hello;
