import { getCookie } from 'cookies-next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User } from '../api/profile/dto/ProfileResDto';
import getScoreboard from '../api/scoreboard/getScoreboard';
import Loading from '../components/Loading';
import Sidebar from '../components/Sidebar';

const Scoreboard = () => {
  const router = useRouter();
  const [scoreboard, setScoreboard] = useState<User[]>([]);
  const [point, setPoint] = useState<boolean>(true);

  useEffect(() => {
    if (!getCookie('accessToken')) router.push('/login');
    (async () => {
      const res = await getScoreboard();
      setScoreboard(res as User[]);
    })();
  }, [setScoreboard]);

  const theme = {
    first: '#D6B26E',
    seconed: '#B8B8B8',
    third: '#CDA681',
  };

  // on event window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPoint(false);
      } else {
        setPoint(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Head>
        <title>LOGCON - Scoreboard</title>
      </Head>
      <Sidebar />
      <ScoreboardWrap>
        <ScoreboardInner>
          <ContentWrap>
            {scoreboard?.length !== 0 ? (
              <>
                <ContentTitle>스코어보드</ContentTitle>
                <Content>
                  <ContentItemWrap>
                    <ContentItemSubWrap>
                      <ContentItemSub>순위</ContentItemSub>
                      <ContentItemSub>이름</ContentItemSub>
                    </ContentItemSubWrap>
                    <ContentItemSubWrap>
                      <ContentItemSub2>푼 문제 수</ContentItemSub2>
                      <ContentItemSub2>포인트</ContentItemSub2>
                    </ContentItemSubWrap>
                  </ContentItemWrap>
                  {scoreboard?.map((user, index) => (
                    <ContentItemWrap
                      onClick={() => router.push(`/profile/${user.id}`)}
                      key={index}
                    >
                      <ContentItemSubWrap>
                        <ContentItem
                          theme={
                            (index === 0 && theme.first) ||
                            (index === 1 && theme.seconed) ||
                            (index === 2 && theme.third)
                          }
                        >
                          {index + 1}위
                        </ContentItem>
                        <ContentItem>{user.name}</ContentItem>
                      </ContentItemSubWrap>
                      <ContentItemSubWrap>
                        <ContentItem2>{user.solved}개</ContentItem2>
                        <ContentItem2 theme={point}>
                          {user.point ?? '0'}
                          {point && ' Points'}
                        </ContentItem2>
                      </ContentItemSubWrap>
                    </ContentItemWrap>
                  ))}
                </Content>
              </>
            ) : (
              <Loading />
            )}
          </ContentWrap>
        </ScoreboardInner>
      </ScoreboardWrap>
    </>
  );
};

const ScoreboardWrap = styled.div`
  width: 100%;
  padding-left: 256px;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const ScoreboardInner = styled.div`
  width: 100%;
  height: 100%;
  padding: 64px 0;
  display: flex;
  justify-content: center;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;

  width: 90%;
  max-width: 960px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.h1`
  color: #ffffff;
  font-weight: 600;
  font-size: 28px;
`;

const ContentItemWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 16px 16px;
  }

  &:nth-child(even) {
    background-color: #28292e;
  }

  &:nth-child(odd) {
    background-color: transparent;
  }

  &:nth-child(2) {
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }

  &:last-child {
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }
`;

const ContentItemSubWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ContentItem = styled.p`
  font-weight: 600;
  font-size: 18px;
  color: #c7ccd9;

  color: ${(props) => props.theme};
`;

const ContentItem2 = styled(ContentItem)`
  width: 128px;

  @media (max-width: 768px) {
    width: 96px;
  }

  @media (max-width: 480px) {
    width: 64px;
  }
`;

const ContentItemSub = styled.p`
  color: #a4a8b3;
  font-weight: 500;
  font-size: 16px;
`;

const ContentItemSub2 = styled(ContentItemSub)`
  width: 128px;

  @media (max-width: 768px) {
    width: 96px;
  }

  @media (max-width: 480px) {
    width: 64px;
  }
`;

export default Scoreboard;
