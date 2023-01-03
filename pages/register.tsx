import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import register from '../api/auth/register';
import Sidebar from '../components/Sidebar';
import {
  AuthInner,
  AuthWrap,
  ContentInput,
  ContentInputBox,
  ContentInputImage,
  ContentInputWrap,
  ContentMovePage,
  ContentSumbit,
  ContentSumbitWrap,
  ContentTitle,
  ContentVisiblePassword,
  ContentVisiblePasswordIcon,
  ContentWrap,
} from '../styles/AuthStyled';

interface InputType {
  name: string;
  id: string;
  email: string;
  school: string;
  password: string;
  passwordCheck: string;
}

const Register = () => {
  const router = useRouter();

  const [input, setInput] = useState<InputType>({
    name: '',
    id: '',
    email: '',
    school: '',
    password: '',
    passwordCheck: '',
  });
  const [visiblePw, setVisiblePw] = useState<{
    password: boolean;
    passwordCheck: boolean;
  }>({
    password: false,
    passwordCheck: false,
  });

  const registerHandler = async () => {
    if (input.password !== input.passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (
      input.id === '' ||
      input.password === '' ||
      input.passwordCheck === '' ||
      input.name === '' ||
      input.email === '' ||
      input.school === ''
    ) {
      alert('빈칸을 모두 채워주세요.');
      return;
    }
    if (input.password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }
    if (input.password.length > 20) {
      alert('비밀번호는 20자 이하여야 합니다.');
      return;
    }
    if (input.id.length < 4) {
      alert('아이디는 4자 이상이어야 합니다.');
      return;
    }
    if (input.id.length > 20) {
      alert('아이디는 20자 이하여야 합니다.');
      return;
    }
    const res = await register({
      name: input.name,
      id: input.id,
      email: input.email,
      school: input.school,
      password: input.password,
    });
    res && router.replace('/');
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleVisiblePassword = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: boolean
  ) => {
    const { name } = e.currentTarget;
    setVisiblePw({
      ...visiblePw,
      [name]: !value,
    });
  };

  return (
    <>
      <Head>
        <title>LOGCON - Register</title>
      </Head>
      <Sidebar />
      <AuthWrap>
        <AuthInner>
          <ContentWrap>
            <ContentTitle src="/assets/logo/logo.svg" />
            <ContentInputWrap>
              <ContentInputBox>
                <ContentInputImage src="/assets/symbols/badge.svg" />
                <ContentInput
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  placeholder="이름"
                />
              </ContentInputBox>
              <ContentInputBox>
                <ContentInputImage src="/assets/symbols/account.svg" />
                <ContentInput
                  name="id"
                  value={input.id}
                  onChange={handleChange}
                  placeholder="아이디"
                />
              </ContentInputBox>
              <ContentInputBox>
                <ContentInputImage src="/assets/symbols/email.svg" />
                <ContentInput
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  placeholder="이메일"
                />
              </ContentInputBox>
              <ContentInputBox style={{ marginBottom: '30px' }}>
                <ContentInputImage src="/assets/symbols/company.svg" />
                <ContentInput
                  name="school"
                  value={input.school}
                  onChange={handleChange}
                  placeholder="소속"
                />
              </ContentInputBox>
            </ContentInputWrap>
            <ContentInputWrap>
              <ContentInputBox>
                <ContentInputImage src="/assets/symbols/lock.svg" />
                <ContentInput
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  type={visiblePw.password ? 'text' : 'password'}
                  placeholder="비밀번호"
                />
                <ContentVisiblePassword
                  name="password"
                  onClick={(e) => {
                    handleVisiblePassword(e, visiblePw.password);
                  }}
                >
                  <ContentVisiblePasswordIcon
                    src={
                      visiblePw.password
                        ? '/assets/symbols/visible.svg'
                        : '/assets/symbols/invisible.svg'
                    }
                  />
                </ContentVisiblePassword>
              </ContentInputBox>
              <ContentInputBox>
                <ContentInputImage src="/assets/symbols/lock.svg" />
                <ContentInput
                  name="passwordCheck"
                  value={input.passwordCheck}
                  onChange={handleChange}
                  type={visiblePw.passwordCheck ? 'text' : 'password'}
                  placeholder="비밀번호 확인"
                />
                <ContentVisiblePassword
                  name="passwordCheck"
                  onClick={(e) => {
                    handleVisiblePassword(e, visiblePw.passwordCheck);
                  }}
                >
                  <ContentVisiblePasswordIcon
                    src={
                      visiblePw.passwordCheck
                        ? '/assets/symbols/visible.svg'
                        : '/assets/symbols/invisible.svg'
                    }
                  />
                </ContentVisiblePassword>
              </ContentInputBox>
            </ContentInputWrap>
            <ContentSumbitWrap>
              <ContentSumbit onClick={registerHandler}>회원가입</ContentSumbit>
              <ContentMovePage href="/login">로그인</ContentMovePage>
            </ContentSumbitWrap>
          </ContentWrap>
        </AuthInner>
      </AuthWrap>
    </>
  );
};

export default Register;
