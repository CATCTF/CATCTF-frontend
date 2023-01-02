import { getCookie } from 'cookies-next';
import Router from 'next/router';
import api from '..';
import { User } from './dto/ProfileResDto';

const getProfileById = async (id: string) => {
  console.log(id);
  try {
    const { data } = await api.get<User>(`/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return data;
  } catch {
    return undefined;
  }
};

export default getProfileById;
