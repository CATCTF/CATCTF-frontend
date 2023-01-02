import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import login from '../api/auth/login';
import Sidebar from '../components/Sidebar';
import {
  AuthWrap,
  AuthInner,
  ContentWrap,
  ContentTitle,
  ContentInputWrap,
  ContentInputBox,
  ContentInput,
  ContentVisiblePassword,
  ContentVisiblePasswordIcon,
  ContentSumbitWrap,
  ContentSumbit,
  ContentInputImage,
  ContentMovePage,
} from '../styles/AuthStyled';

interface InputType {
  id: string;
  pw: string;
}

const Login = () => {
  const router = useRouter();
  const [input, setInput] = useState<InputType>({
    id: '',
    pw: '',
  });
  const [visiblePw, setVisiblePw] = useState<boolean>(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const loginHandler = async () => {
    const res = await login({ id: input.id, password: input.pw });
    res && router.replace('/');
  };

  const handleVisiblePassword = () => setVisiblePw(!visiblePw);

  return (
    <>
      <Head>
        <title>LOGCON - Login</title>
      </Head>
      <Sidebar />
      <AuthWrap>
        <AuthInner>
          <ContentWrap>
            <ContentTitle src="/assets/logo/logo.svg" />
            <ContentInputWrap>
              <ContentInputBox>
                <ContentInputImage src="/assets/symbols/account.svg" />
                <ContentInput
                  name="id"
                  value={input.id}
                  onChange={handleChange}
                  type="text"
                  placeholder="아이디"
                />
              </ContentInputBox>
              <ContentInputBox>
                <ContentInputImage src="/assets/symbols/lock.svg" />
                <ContentInput
                  name="pw"
                  value={input.pw}
                  onChange={handleChange}
                  type={visiblePw ? 'text' : 'password'}
                  placeholder="비밀번호"
                />
                <ContentVisiblePassword onClick={handleVisiblePassword}>
                  <ContentVisiblePasswordIcon
                    src={
                      visiblePw
                        ? '/assets/symbols/visible.svg'
                        : '/assets/symbols/invisible.svg'
                    }
                  />
                </ContentVisiblePassword>
              </ContentInputBox>
            </ContentInputWrap>
            <ContentSumbitWrap>
              <ContentSumbit onClick={loginHandler}>로그인</ContentSumbit>
              <ContentMovePage href="/register">회원가입</ContentMovePage>
            </ContentSumbitWrap>
          </ContentWrap>
        </AuthInner>
      </AuthWrap>
    </>
  );
};
export default Login;
