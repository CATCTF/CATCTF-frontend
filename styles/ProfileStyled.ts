import styled from 'styled-components';

export const ProfileWrap = styled.div`
  width: 100%;
  padding-left: 256px;
  color: #ffffff;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

export const ProfileInner = styled.div`
  width: 100%;
  height: 100%;
  padding: 64px 0;

  display: flex;
  justify-content: center;
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;

  width: 90%;
  max-width: 960px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ContentTitle = styled.h1`
  font-weight: 600;
  font-size: 28px;
  color: #ffffff;
`;

export const ProfileItemWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px;
  background-color: #28292e;
  border-radius: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const ProfileItemInfoWrap = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export const ProfileItemInfoImageWrap = styled.div`
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background-color: #35373d;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileItemInfoImage = styled.img`
  width: 60%;
  height: 60%;
`;

export const ProfileItemInfoTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProfileItemInfoSubTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProfileItemInfoSubText = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: #c7ccd9;
`;

export const ProfileItemInfoName = styled.p`
  font-weight: 600;
  font-size: 24px;

  display: flex;
  align-items: center;
  gap: 2px;
`;

export const ProfileItemInfoSubName = styled.span`
  font-weight: 500;
  font-size: 18px;
  color: #c7ccd9;
`;

export const ProfileItemButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

export const ProfileItemButton = styled.button`
  padding: 12px 16px;
  background-color: #35373d;
  border-radius: 8px;
  color: #ffffff;

  font-weight: 500;
  font-size: 16px;
  cursor: pointer;

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ProfileItemButtonIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const ContentTitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ContentSubTitle = styled.h2`
  color: #a4a8b2;
  font-weight: 500;
  font-size: 18px;
`;

export const ProfileChallWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProfileChallDescWrap = styled.div`
  display: flex;
`;

export const ProfileChallDesc = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: #c7ccd9;
`;

export const ProfileChallDesc2 = styled(ProfileChallDesc)`
  width: 172px;

  @media (max-width: 768px) {
    width: 120px;
  }
`;

export const ProfileChallDesc3 = styled(ProfileChallDesc)`
  width: 96px;

  @media (max-width: 768px) {
    width: 60px;
  }
`;

export const ProfileChallSubItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;
  background-color: transparent;
`;


export const ProfileChallItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-radius: 12px;
  background-color: #28292e;
  cursor: pointer;
`;
