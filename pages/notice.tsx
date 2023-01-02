import { getCookie } from 'cookies-next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Notice as NoticeType } from '../api/notice/dto/Notice';
import getNotice from '../api/notice/getNotice';
import Loading from '../components/Loading';
import Sidebar from '../components/Sidebar';
import { ContentWrap, ContentTitle, Content } from '../styles/ProfileStyled';

const Notice = () => {
  const router = useRouter();
  const [notice, setNotice] = useState<NoticeType[]>();

  useEffect(() => {
    if (!getCookie('accessToken')) router.push('/login');
    (async () => {
      const res = await getNotice();
      setNotice(res);
    })();
  }, [setNotice]);

  return (
    <>
      <Head>
        <title>LOGCON - Notice</title>
      </Head>
      <Sidebar />
      <NoticeWrap>
        <NoticeInner>
          <ContentWrap>
            {notice ? (
              <Content>
                <ContentTitle>공지사항</ContentTitle>
                {notice?.map((item, index) => (
                  <NoticeItem key={index}>
                    <NoticeTitleWrap>
                      <NoticeTitle>{item?.title}</NoticeTitle>
                      <NoticeDate>
                        {item?.createdAt
                          .toString()
                          .replace('T', ' ')
                          .replace(/\..*/, '')
                          .split(':')
                          .slice(0, 2)
                          .join(':')}
                      </NoticeDate>
                    </NoticeTitleWrap>
                    <NoticeContent>{item.content}</NoticeContent>
                  </NoticeItem>
                ))}
              </Content>
            ) : (
              <Loading />
            )}
          </ContentWrap>
        </NoticeInner>
      </NoticeWrap>
    </>
  );
};

const NoticeWrap = styled.div`
  width: 100%;
  padding-left: 256px;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const NoticeInner = styled.div`
  width: 100%;
  height: 100%;
  padding: 64px 0;

  display: flex;
  justify-content: center;
`;

const NoticeItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #28292e;
  padding: 32px;
  border-radius: 12px;
  gap: 24px;
`;

const NoticeTitleWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

const NoticeTitle = styled.h1`
  color: #ffffff;
  font-weight: 600;
  font-size: 24px;
`;

const NoticeDate = styled.p`
  color: #a4a8b3;
  font-weight: 500;
  font-size: 16px;
`;

const NoticeContent = styled.p`
  color: #c7ccd9;
  font-weight: 500;
  font-size: 16px;
`;

export default Notice;
