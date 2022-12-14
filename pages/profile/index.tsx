import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import changeProfile from '../../api/profile/changeProfile';
import { User } from '../../api/profile/dto/ProfileResDto';
import getProfile from '../../api/profile/getProfile';
import Loading from '../../components/Loading';
import Sidebar from '../../components/Sidebar';
import {
  ProfileWrap,
  ProfileInner,
  Content,
  ContentWrap,
  ContentTitle,
  ProfileItemWrap,
  ProfileItemInfoWrap,
  ProfileItemInfoImageWrap,
  ProfileItemInfoImage,
  ProfileItemInfoTextWrap,
  ProfileItemInfoName,
  ProfileItemInfoSubName,
  ProfileItemInfoSubTextWrap,
  ProfileItemInfoSubText,
  ProfileItemButtonWrap,
  ProfileItemButton,
  ProfileItemButtonIcon,
  ContentTitleWrap,
  ContentSubTitle,
  ProfileChallWrap,
  ProfileChallSubItem,
  ProfileChallDesc,
  ProfileChallDescWrap,
  ProfileChallDesc2,
  ProfileChallDesc3,
  ProfileChallItem,
} from '../../styles/ProfileStyled';

const Profile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<User>();
  const [mobile, setMobile] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [input, setInput] = useState<{
    name: string;
    school: string;
  }>({
    name: '',
    school: '',
  });

  useEffect(() => {
    if (!getCookie('accessToken')) router.push('/login');
    (async () => {
      const res = await getProfile();
      setProfile(res);
      setInput({
        name: res?.name as string,
        school: res?.school as string,
      });
    })();
  }, [setProfile]);

  const handleLogout = () => {
    setCookie('accessToken', '');
    router.push('/');
  };

  // on event window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobile(false);
      } else {
        setMobile(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleEdit = async () => {
    if (isEdit) {
      if (input.name === '' || input.school === '') {
        alert('????????? ?????? ??????????????????.');
        return;
      } else {
        await changeProfile({ name: input.name, school: input.school });
        router.reload();
      }
    }
    setIsEdit(!isEdit);
  };

  return (
    <>
      <Head>
        <title>CATCTF - Profile</title>
      </Head>
      <Sidebar />
      <ProfileWrap>
        <ProfileInner>
          <ContentWrap>
            {profile ? (
              <>
                <Content>
                  <ContentTitle>?????????</ContentTitle>
                  <ProfileItemWrap>
                    <ProfileItemInfoWrap>
                      <ProfileItemInfoImageWrap>
                        <ProfileItemInfoImage src="/assets/symbols/profile.svg" />
                      </ProfileItemInfoImageWrap>
                      {!isEdit ? (
                        <ProfileItemInfoTextWrap>
                          <ProfileItemInfoName>
                            {profile?.name}
                            <ProfileItemInfoSubName>
                              ( {profile?.id} )
                            </ProfileItemInfoSubName>
                          </ProfileItemInfoName>
                          <ProfileItemInfoSubTextWrap>
                            <ProfileItemInfoSubText>
                              {profile?.school}
                            </ProfileItemInfoSubText>
                            <ProfileItemInfoSubText>
                              ??? {profile?.point} Points
                            </ProfileItemInfoSubText>
                          </ProfileItemInfoSubTextWrap>
                        </ProfileItemInfoTextWrap>
                      ) : (
                        <ProfileItemInfoTextWrap>
                          <ProfileEdit>
                            <ProfileEditLabel>??????</ProfileEditLabel>
                            <ProfileEditInput
                              name="name"
                              type="text"
                              value={input.name}
                              onChange={handleInput}
                              placeholder={profile?.name}
                            />
                          </ProfileEdit>
                          <ProfileEdit>
                            <ProfileEditLabel>??????</ProfileEditLabel>
                            <ProfileEditInput
                              name="school"
                              type="text"
                              value={input.school}
                              onChange={handleInput}
                              placeholder={profile?.school}
                            />
                          </ProfileEdit>
                        </ProfileItemInfoTextWrap>
                      )}
                    </ProfileItemInfoWrap>
                    <ProfileItemButtonWrap>
                      {!isEdit ? (
                        <>
                          <ProfileItemButton onClick={handleEdit}>
                            ????????? ??????
                            <ProfileItemButtonIcon src="/assets/symbols/edit.svg" />
                          </ProfileItemButton>
                          <ProfileItemButton onClick={handleLogout}>
                            ????????????
                            <ProfileItemButtonIcon src="/assets/symbols/exit.svg" />
                          </ProfileItemButton>
                        </>
                      ) : (
                        <ProfileItemButton onClick={handleEdit}>
                          ?????? ??????
                          <ProfileItemButtonIcon src="/assets/symbols/check.svg" />
                        </ProfileItemButton>
                      )}
                    </ProfileItemButtonWrap>
                  </ProfileItemWrap>
                </Content>
                <Content>
                  <ContentTitleWrap>
                    <ContentTitle>??? ??????</ContentTitle>
                    <ContentSubTitle>
                      ??? {profile?.solves?.length}???
                    </ContentSubTitle>
                  </ContentTitleWrap>
                  <ProfileChallWrap>
                    <ProfileChallSubItem>
                      <ProfileChallDesc>??????</ProfileChallDesc>
                      <ProfileChallDescWrap>
                        {mobile && (
                          <ProfileChallDesc2>????????? ??????</ProfileChallDesc2>
                        )}
                        <ProfileChallDesc3>?????????</ProfileChallDesc3>
                      </ProfileChallDescWrap>
                    </ProfileChallSubItem>
                    {profile?.solves?.map((solve) => (
                      <ProfileChallItem key={solve.id}>
                        <ProfileChallDesc>
                          {solve.challenge?.name}
                        </ProfileChallDesc>
                        <ProfileChallDescWrap>
                          {mobile && (
                            <ProfileChallDesc2>
                              {solve?.createdAt
                                .toString()
                                .replace('T', ' ')
                                .replace(/\..*/, '')
                                .split(':')
                                .slice(0, 2)
                                .join(':')}
                            </ProfileChallDesc2>
                          )}
                          <ProfileChallDesc3>
                            {solve.challenge?.point} {mobile && 'Points'}
                          </ProfileChallDesc3>
                        </ProfileChallDescWrap>
                      </ProfileChallItem>
                    ))}
                  </ProfileChallWrap>
                </Content>
              </>
            ) : (
              <Loading />
            )}
          </ContentWrap>
        </ProfileInner>
      </ProfileWrap>
    </>
  );
};

const ProfileEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 200px;
`;

const ProfileEditLabel = styled.p`
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
`;

const ProfileEditInput = styled.input`
  width: 100%;
  height: 36px;
  padding: 12px 16px;

  background-color: #43454d;
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  border-radius: 8px;

  &::placeholder {
    color: #a4a8b3;
  }
`;

export default Profile;
