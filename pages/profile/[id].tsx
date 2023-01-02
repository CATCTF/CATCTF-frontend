import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { User } from '../../api/profile/dto/ProfileResDto';
import getProfileById from '../../api/profile/getProfileById';
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

  useEffect(() => {
    if (!getCookie('accessToken')) router.push('/login');
    if (!router.isReady) return;
    (async () => {
      const profildId = router.query.id;
      const res = await getProfileById(profildId as string);
      if (!res) {
        router.push('/profile');
        return;
      }
      setProfile(res);
    })();
  }, [setProfile, router.isReady]);

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
                  <ContentTitle>프로필</ContentTitle>
                  <ProfileItemWrap>
                    <ProfileItemInfoWrap>
                      <ProfileItemInfoImageWrap>
                        <ProfileItemInfoImage src="/assets/symbols/profile.svg" />
                      </ProfileItemInfoImageWrap>
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
                            총 {profile?.point} Points
                          </ProfileItemInfoSubText>
                        </ProfileItemInfoSubTextWrap>
                      </ProfileItemInfoTextWrap>
                    </ProfileItemInfoWrap>
                  </ProfileItemWrap>
                </Content>
                <Content>
                  <ContentTitleWrap>
                    <ContentTitle>푼 문제</ContentTitle>
                    <ContentSubTitle>
                      총 {profile?.solves?.length}개
                    </ContentSubTitle>
                  </ContentTitleWrap>
                  <ProfileChallWrap>
                    <ProfileChallSubItem>
                      <ProfileChallDesc>이름</ProfileChallDesc>
                      <ProfileChallDescWrap>
                        {mobile && (
                          <ProfileChallDesc2>풀이한 시간</ProfileChallDesc2>
                        )}
                        <ProfileChallDesc3>포인트</ProfileChallDesc3>
                      </ProfileChallDescWrap>
                    </ProfileChallSubItem>
                    {profile?.solves?.map((solve) => (
                      <ProfileChallItem
                        onClick={() => router.push('/challenge')}
                        key={solve.id}
                      >
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

export default Profile;
