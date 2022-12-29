import { setCookie } from 'cookies-next';
import api from '..';
import { AuthResDto } from './dto/AuthResDto';

interface Payload {
  id: string;
  name: string;
  email: string;
  password: string;
  school: string;
}

const register = async (payload: Payload): Promise<AuthResDto> => {
  const { data } = await api.post('/auth/register', payload);
  api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
  setCookie('accessToken', data.accessToken);
  return data;
};

export default register;
