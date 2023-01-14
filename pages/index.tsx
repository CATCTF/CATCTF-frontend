import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import { ContentWrap } from '../styles/ProfileStyled';

const Index = () => {
  const theme = {
    first: '#D6B26E',
    second: '#B8B8B8',
    third: '#CDA681',
    special: '#C7CCD9',
  };

  return (
    <>
      <Head>
        <title>LOGCON</title>
      </Head>
      <Sidebar />
      <IndexWrap>
        <IndexInner>
          <ContentWrapCenter>
            <IndexItem>
              <IndexFlexTop>
                <IndexLogoWrap>
                  <IndexLogoTitle>6th</IndexLogoTitle>
                  <IndexLogoImage src="/assets/logo/logo.svg" />
                </IndexLogoWrap>
                <IndexContent>
                  2023. 1. 14. 9:00 ~ 2023. 1. 15. 9:00
                </IndexContent>
                <IndexButton
                  target="_blank"
                  href="https://discord.gg/BvbzyZNjNd"
                >
                  디스코드 서버 참가
                  <IndexButtonImg src="/assets/symbols/right.svg" />
                </IndexButton>
              </IndexFlexTop>
              <IndexFlexBottom>
                <IndexLogoTitle>시상 내역</IndexLogoTitle>
                <IndexContent>
                  <IndexContentBold theme={theme.first}>1등</IndexContentBold>
                  &nbsp;&nbsp;COX CK108 키보드
                </IndexContent>
                <IndexContent>
                  <IndexContentBold theme={theme.second}>2등</IndexContentBold>
                  &nbsp;&nbsp;로지텍 G502 Hero 게이밍 마우스
                </IndexContent>
                <IndexContent>
                  <IndexContentBold theme={theme.third}>3등</IndexContentBold>
                  &nbsp;&nbsp;COX 게이밍 헤드셋
                </IndexContent>
                <IndexContent>
                  <IndexContentBold theme={theme.special}>
                    특별상
                  </IndexContentBold>
                  &nbsp;&nbsp;10,000 mAh 보조배터리
                </IndexContent>
              </IndexFlexBottom>
            </IndexItem>
          </ContentWrapCenter>
        </IndexInner>
        <Event>ev3nT_f0r_you{'}'}</Event>
      </IndexWrap>
    </>
  );
};

const IndexWrap = styled.div`
  width: 100%;
  height: 100vh;
  padding-left: 256px;

  user-select: none;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const ContentWrapCenter = styled(ContentWrap)`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const IndexInner = styled.div`
  width: 100%;
  height: 100%;
  padding: 64px 0;

  display: flex;
  justify-content: center;
`;

const IndexItem = styled.div`
  width: 100%;
  max-width: 640px;
  padding: 64px 0;

  border-radius: 12px;
  background-color: #28292e;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
`;

const IndexLogoWrap = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  align-items: center;
`;

const IndexLogoTitle = styled.h1`
  color: #ffffff;
  font-weight: 600;
  font-size: 28px;
`;

const IndexLogoImage = styled.img`
  width: 192px;
`;

const IndexFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IndexFlexTop = styled(IndexFlex)`
  gap: 32px;
`;

const IndexButton = styled(Link)`
  padding: 12px 16px;
  background-color: #35373d;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  color: #c7ccd9;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IndexButtonImg = styled.img`
  width: 16px;
  height: 16px;
`;

const IndexFlexBottom = styled(IndexFlex)`
  gap: 17px;
`;

const IndexContent = styled.p`
  font-weight: 500;
  font-size: 18px;
  color: #c7ccd9;
`;

const IndexContentBold = styled.strong`
  font-weight: 600;
  font-size: 18px;

  color: ${(props) => props.theme};
`;

const Event = styled.p`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #232428;
`;

export default Index;
