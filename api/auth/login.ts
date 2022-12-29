import { setCookie } from 'cookies-next';
import api from '..';
import { AuthResDto } from './dto/AuthResDto';

interface Payload {
  id: string;
  password: string;
}

const login = async (payload: Payload): Promise<AuthResDto> => {
  const { data } = await api.post('/auth/login', payload);
  api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
  setCookie('accessToken', data.accessToken);
  return data;
};

export default login;
