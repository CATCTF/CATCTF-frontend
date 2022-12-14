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
                  placeholder="μμ΄λ"
                />
              </ContentInputBox>
              <ContentInputBox>
                <ContentInputImage src="/assets/symbols/lock.svg" />
                <ContentInput
                  name="pw"
                  value={input.pw}
                  onChange={handleChange}
                  type={visiblePw ? 'text' : 'password'}
                  placeholder="λΉλ°λ²νΈ"
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
              <ContentSumbit onClick={loginHandler}>λ‘κ·ΈμΈ</ContentSumbit>
              <ContentMovePage href="/register">νμκ°μ</ContentMovePage>
            </ContentSumbitWrap>
          </ContentWrap>
        </AuthInner>
      </AuthWrap>
    </>
  );
};
export default Login;
